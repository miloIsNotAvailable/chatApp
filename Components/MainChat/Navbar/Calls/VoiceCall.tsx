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
    const pc = useContext( RTCConnection )

    const[ answerCandidates, setAnswerCandidates ] = useState<RTCIceCandidate | null>( null )

    useEffect( () => { 
        _io.pipe(
            mergeMap( 
                client => fromEvent( client, 'get-answer-candidates' )
                .pipe(
                    map( data => data )
                )
            )
        ).subscribe( console.log )
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