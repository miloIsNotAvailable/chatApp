import Image from "next/image";
import { FC, useContext, useEffect, useState } from "react";
import MicIcon from '../../../../graphics/mic.svg' 
import { useUserInfo } from "../../../constants/userConstants";
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

    return (
        <div>
            <Image 
            className={ styles.voice_call_icon } 
            src={ MicIcon }
            alt=""
            onClick={ () => callUser( { name, channelID }, pc ) }/>
        </div>
    )
}

export default VoiceCall