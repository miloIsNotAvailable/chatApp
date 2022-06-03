import { FC, useContext, useEffect, useState } from "react";
import { SessionContext } from "../../contexts/context";
import Chat from "../Chat/mainchat/build/Chat";
import FriendList from "../FriendsList/FriendList";
import Navbar from "../Navbar";
import Settings from "../Settings/Settings";
import { styles } from "./MainChatStyles";
import { MessageType } from "../../store/interfaces";
import { RTCConnectionContext } from "../../contexts/WebRTContext";
import { servers } from "../../constants/webRTCConstants";

type newMessageState = {
    newMessage: MessageType
}


const BuildMainChat: FC = () => {
    
    /**
     * @param sessionContext
     * @returns a jwt session token 
     * containing email, id and username 
     */

    const sessionContext = useContext( SessionContext )
    const [ webRTC, setwebRTC ] = useState<RTCPeerConnection | null>( null )

    useEffect( () => {
        const pc: RTCPeerConnection = new RTCPeerConnection( servers )
        setwebRTC( pc )
    
    }, [] )

    return (
        <RTCConnectionContext value={ webRTC }>
            <div className={ styles.mainchat_display }>
                <Navbar/>
                <div className={ styles.mainchat_body }>
                    <div className={ styles.sidebar }>
                        <FriendList/>
                        <Settings/>
                    </div>
                    <Chat/>
                </div>
            </div>
        </RTCConnectionContext>
    )
}

export default BuildMainChat