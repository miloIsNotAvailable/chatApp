import { map, mergeMap, of } from "rxjs";
import { _io } from "../../../constants/WebSocketsConstants";
import { callUserTypes } from "../../../interfaces/webRTCInterfaces";

const servers: RTCConfiguration = {
    iceServers: [
        {
            urls: [ 'stun:stun1.l.google.com:19302','stun:stun2.l.google.com:19302' ]
        }
    ],
    iceCandidatePoolSize: 10
}

let localStream: MediaStream, remoteStream: MediaStream;
let localVideo: HTMLElement | null, remoteVideo: HTMLElement | null;

export const callUser = async( { name, channelID }: callUserTypes ) => {

    const pc = new RTCPeerConnection( servers )

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

    const offer = await pc.createOffer()
    await pc.setLocalDescription( offer )

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
}