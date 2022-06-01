import { fromEvent, map, mergeMap, of } from "rxjs";
import { _io } from "../../../constants/WebSocketsConstants";
import { callUserTypes, setCallType } from "../../../interfaces/webRTCInterfaces";

let localStream: MediaStream, remoteStream: MediaStream;
let localVideo: HTMLElement | null, remoteVideo: HTMLElement | null;

export const callUser = async( { name, channelID }: callUserTypes, pc: RTCPeerConnection | null, answerCandidates: RTCIceCandidate | null ) => {

    if( !pc ) return

    localStream = await navigator.mediaDevices.getUserMedia( { audio: true } )
    localStream = new MediaStream()

    localStream.getTracks().forEach( track => {
        pc.addTrack( track, localStream )
    } )

    pc.ontrack = event => {
        event.streams[0].getTracks().forEach( track => {
            remoteStream.addTrack( track )
        } )
    }

    localVideo = document.getElementById( 'webcam' )
    remoteVideo = document.getElementById( 'remote' )

    if(localVideo) {
        const lc = localVideo as HTMLAudioElement
        lc.srcObject = localStream
    }

    if( remoteVideo ) {
        const rc = remoteVideo as HTMLAudioElement
        rc.srcObject = localStream
    }

    const offer = await pc.createOffer( { offerToReceiveAudio: true, offerToReceiveVideo: true } )
    await pc.setLocalDescription( offer )

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

export const answerCall = async( 
    { name, channelID }: callUserTypes, 
    pc: RTCPeerConnection | null, 
    offer: setCallType,
    offerCandidates: RTCIceCandidate | null
) => {

    if( !pc ) return

    offer && 
    await pc.setRemoteDescription( 
        new RTCSessionDescription( { sdp: offer?.sdp, type: offer?.type } ) 
    )

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