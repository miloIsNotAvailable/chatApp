import { fromEvent, map, mergeMap, of } from "rxjs";
import { _io } from "../../../constants/WebSocketsConstants";
import { callUserTypes, setCallType } from "../../../interfaces/webRTCInterfaces";

// get local stream and video elements like before
// on call they'll just get updated, I don't know 
// why it works like that it just does 

let localStream: MediaStream, remoteStream: MediaStream;
let localVideo: HTMLElement | null , remoteVideo: HTMLElement | null;

/**
 * @function callUser 
 * @description 
 * after initializing the audio stuff again 
 * (don't know why it just doesn't work otherwise)
 * create an offer width sdp (we'll need it to set 
 * remote description for callee) 
 * and add local description so we can 
 * start listening and emitting ice candidate data. 
 * 
 * When callee answers the call they'll send 
 * their ice candidate and answer, which will be set to 
 * remote description. 
 */

export const callUser = async( { name, channelID }: callUserTypes, pc: RTCPeerConnection | null ) => {

    if( !pc ) return

    localStream = await navigator.mediaDevices.getUserMedia( { audio: true } )
    remoteStream = new MediaStream()

    localStream.getTracks().forEach( track => {
        pc.addTrack( track, localStream )
    } )

    localVideo = document.getElementById( 'webcam' )
    remoteVideo = document.getElementById( 'remote' )

    pc.ontrack = event => {
        event.streams[0].getTracks().forEach( track => {
            remoteStream.addTrack( track )
        } )

        const [ remote ] = event.streams

        if( remoteVideo ) {
            const rc = remoteVideo as HTMLAudioElement
            if( rc ) {
                rc.srcObject = remote
            }
        }
    }

    if(localVideo) {
        const lc = localVideo as HTMLAudioElement
        lc.srcObject = localStream
        lc.muted = true
    }

    /**
     * @description create an offer  
     * @param channelID 
     * so we know where to listen and send stuff
     * @param name
     * so we know who started a call
     * @param sdp
     * smart people stuff 
     * @param type
     * offer or answer
     */
    const offer = await pc.createOffer( { offerToReceiveAudio: true, offerToReceiveVideo: true } )
    await pc.setLocalDescription( offer )

    /**
     * @description emit new ice candidates.
     * 
     *  ===> it HAS to be defined after 
     * setting local description
     */

    pc.onicecandidate = event => {
        event.candidate && _io.pipe(
            mergeMap( 
                ( client ) => of( { candidate: event.candidate } )
                .pipe( 
                    map( data => ( { data, client } ) )
                    )
                )
        ).subscribe( ( { data, client } ) => {
            console.log( data )
            client.emit( 'offer-candidate', data )
        } )
    }

    /**
     * @description emit new offer 
     **/

    offer && _io.pipe(
        mergeMap( 
            // and why spread syntax didn't 
            // wanna work on this one
            // shall forever remain a mystery 
            ( client ) => of( { name, channelID, sdp: offer.sdp, type: offer.type } )
            .pipe( 
                map( data => ( { data, client } ) )
             )
         )
    ).subscribe( ( { data, client } ) => {
        console.log( data )
        client.emit( 'call-started', data  )
    } )

    /**
     * @description 
     * if user-call-answered gets emitted 
     * ( callee responded ) then set remote 
     * description with the sdp and type 
     * and then add ice candidates 
     */

    _io.pipe(
        mergeMap( 
            client => fromEvent( client, 'user-call-answered' )
            .pipe(
                map( data => data )
            )
        )
    ).subscribe( ( async data => {
        await pc.setRemoteDescription( { sdp: data?.sdp, type: data?.type } )
        .then( () => {
            _io.pipe(
                mergeMap( 
                    client => fromEvent( client, 'get-answer-candidates' )
                    .pipe(
                        map( data => data )
                    )
                )
            ).subscribe( ( data => {
                const candidate = new RTCIceCandidate( data.candidate )
                pc.addIceCandidate( candidate )
                pc.onconnectionstatechange = () => console.log( 'connected' )
            } ) )
        } )
    } ) )
}

/**
 * @function answerCall
 * @description 
 * listen to offers, if there are any,
 * aka user called then set the offer 
 * as remote description, and add answer 
 * as local description, then you 
 * can emit and listen to ice candidates, 
 * sos emit one and later add caller's ice candidate 
 * data 
 */

export const answerCall = async( 
    { name, channelID }: callUserTypes, 
    pc: RTCPeerConnection | null, 
    // had to listen to those in receiveCall.tsx
    // and pass 'em as props
    offer: setCallType,
    offerCandidates: RTCIceCandidate | null
) => {

    if( !pc ) return

    // set offer as remote description
    offer && 
    await pc.setRemoteDescription( 
        new RTCSessionDescription( { sdp: offer?.sdp, type: offer?.type } ) 
    )

    // set answer as local description
    // then emit calee's candidate data
    const answer = await pc.createAnswer( { offerToReceiveAudio: true, offerToReceiveVideo: true } )
    await pc.setLocalDescription( answer ).then(
        () => {
            pc.onicecandidate = event => {
                event.candidate && _io.pipe(
                    mergeMap( 
                        ( client ) => of( { candidate: event.candidate } )
                        .pipe( 
                            map( data => ( { data, client } ) )
                            )
                        )
                ).subscribe( ( { data, client } ) => {
                    console.log( data )
                    client.emit( 'answer-candidate', { ...data, channelID, name } )
                } )
            }
        }
    )

    // emit answer 
    answer && _io.pipe(
        mergeMap( 
            // and why spread syntax didn't 
            // wanna work on this one
            // shall forever remain a mystery 
            ( client ) => of( { name, channelID, sdp: answer.sdp, type: answer.type } )
            .pipe( 
                map( data => ( { data, client } ) )
             )
         )
    ).subscribe( ( { data, client } ) => {
        client.emit( 'call-answered', data  )
    } )

    offerCandidates && pc.addIceCandidate( new RTCIceCandidate( offerCandidates ) )
}