import { FC, useContext, useEffect, useRef, useState } from "react";
import { SessionContext } from "../../contexts/context";
import Chat from "../Chat/mainchat/build/Chat";
import FriendList from "../FriendsList/FriendList";
import Navbar from "../Navbar";
import Settings from "../Settings/Settings";
import { styles } from "./MainChatStyles";
import { MessageType } from "../../store/interfaces";
import { RTCConnectionContext } from "../../contexts/WebRTContext";
import { servers } from "../../constants/webRTCConstants";
import { motion } from 'framer-motion' 
import { clientSide } from "../../constants/clientSide";

type newMessageState = {
    newMessage: MessageType
}

const BuildMainChat: FC = () => {
    
    /**
     * @param sessionContext
     * @returns a jwt session token 
     * containing email, id and username 
     */

    const mainchatRef = useRef<HTMLDivElement | null>( null )
    const [ pos, setPos ] = useState<{ x: number | null, y: number | null }>( { x: null, y: null } )

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
                <motion.div 
                ref={ mainchatRef }
                animate={ 
                    clientSide && window?.innerWidth < 400 &&
                    pos.x && mainchatRef.current && 
                    pos.x > mainchatRef.current.clientWidth * .25 ? 
                    { transform: 'translateX( 80% )' } :
                    { transform: 'translateX( 0% )' }
                }
                onTouchMove={ ( event ) => {
                    console.log( event.touches[0].clientX, event.touches[0].clientY )
                    setPos( {
                        x: Math.abs( event.touches[0].clientX ), 
                        y: Math.abs( event.touches[0].clientY ), 
                    } )
                } }
                className={ styles.mainchat_body }>
                    <div className={ styles.sidebar }>
                        <FriendList/>
                        <Settings/>
                    </div>
                    <Chat/>
                </motion.div>
                {
                    (clientSide && window.innerWidth < 400) ? 
                    <div className={ styles.sidebar }>
                        <FriendList/>
                        <Settings/>
                    </div> : <></>
                }
            </div>
        </RTCConnectionContext>
    )
}

export default BuildMainChat