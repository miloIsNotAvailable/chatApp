import { lstat } from "fs/promises";
import Image from "next/image";
import { FC, useContext, useEffect, useState } from "react";
import { fromEvent, map, mergeMap } from "rxjs";
import MicIcon from '../../../../graphics/mic.svg' 
import { useUserInfo } from "../../../constants/userConstants";
import { _io } from "../../../constants/WebSocketsConstants";
import { RTCConnection, RTCConnectionContext } from "../../../contexts/WebRTContext";
import { newRTCPeerConnection } from "../../../store/createRTCPeer";
import { useAppDispatch } from "../../../store/hooks";
import { styles } from "../Build/NavbarStyles";
import { callUser } from "./createConnection";

const servers: RTCConfiguration = {
    iceServers: [
        {
            urls: [ 'stun:stun1.l.google.com:19302','stun:stun2.l.google.com:19302' ]
        }
    ],
    iceCandidatePoolSize: 10,
    
}

const VoiceCall: FC = () => {

    const { name, channelID } = useUserInfo()
    
    /**
     * had to use context for initialising 
     * RTCPeerCOnnection globally because 
     * next.js preloads stuff and it throws an
     * error
     */
    const pc = useContext( RTCConnection )

    const[ answerCandidates, setAnswerCandidates ] = useState<RTCIceCandidate | null>( null )

    /**
     * @param localStream, @param remoteStream 
     * are just audio streams from both ends, 
     * caller and callee
     */
    let localStream: MediaStream, remoteStream: MediaStream;
    let localVideo: HTMLElement | null , remoteVideo: HTMLElement | null;    

    /**
     * @function initialise
     * @desc connects local user's mic 
     * so it's ready for when they call 
     * or are called
     */

    const initialise = async() => {

        if( !pc ) return

        // connect to mic
        localStream = await navigator.mediaDevices.getUserMedia( { audio: true } )
        // initialize remote stream
        remoteStream = new MediaStream()
    
        // get tracks ( audio ) for local stream
        localStream.getTracks().forEach( track => {
            pc.addTrack( track, localStream )
        } )
    
        // get video elements from DOM 
        localVideo = document.getElementById( 'webcam' )
        remoteVideo = document.getElementById( 'remote' )
    
        // on new track, add streams to remote track
        pc.ontrack = event => {
            event.streams[0].getTracks().forEach( track => {
                remoteStream.addTrack( track )
            } )    
        }
        
        // connect the stream (audio) to video elements 
        if( remoteVideo ) {
            const rc = remoteVideo as HTMLAudioElement
            rc.srcObject = remoteStream
        }

        if(localVideo) {
            const lc = localVideo as HTMLAudioElement
            lc.srcObject = localStream
            // mute yourself, 'cause you 
            // dont wanna hear yourself
            lc.muted = true
        }
    }

    useEffect( () => { 
        _io.pipe(
            mergeMap( 
                client => fromEvent( client, 'get-answer-candidates' )
                .pipe(
                    map( data => data )
                )
            )
        ).subscribe( console.log )
        initialise()
     } )
     
    return (
        <div>
            <Image 
            className={ styles.voice_call_icon } 
            src={ MicIcon }
            alt=""
            onClick={ () => callUser( { name, channelID }, pc, answerCandidates ) }/>
        </div>
    )
}

export default VoiceCall