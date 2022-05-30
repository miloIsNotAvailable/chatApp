import { FC, useCallback, useContext, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from 'framer-motion'
import DisplayMessage from "./displayMessage";
import UserIsTyping from "../userIsTyping";
import ChatInput from "../chatInput";
import { styles } from "../ChatStyles";
import { SessionRerouteContext } from "../../../contexts/context";
import { MessageType } from "../../../store/interfaces";
import { useUserInfo } from "../../../constants/userConstants";
import { Channel } from "@prisma/client";
import { useFetch } from "../../FriendsList/FetchChannels";
import { IOObservable, SocketType } from "../../../interfaces/WebSocketsTypes";
import { listenToMessages } from "./listenToMessages";
import { useChatContext } from "../../../contexts/CHatContext";

type Msg = MessageType & { messageID: string }

const DisplayChat: FC = () => {
 

    const { channelID, channels  } = useUserInfo()    
    const { msgs, setMsg } = useChatContext()
    
    const mainchatRef = useRef<HTMLDivElement>( null )

    const handle = ( v: IOObservable<SocketType> ) => {
        setMsg( ( prev: any[] ): Msg[] => [ v, ...prev ] )

        setTimeout( () => {
            const mainchat = document.getElementById( 'mainchat' )
            mainchat?.scrollTo( 0, mainchat?.scrollHeight )
        }, 300 )
    }

    useEffect( () => {console.log( msgs )}, [ msgs ] )


    // eslint-disable-next-line react-hooks/exhaustive-deps
    const memoizeReceived = useCallback( () => listenToMessages( handle ), [] )

    useEffect( () => memoizeReceived, [ memoizeReceived ] )

    useEffect( () => { 
        const mainchat = document.getElementById( 'mainchat' )
        setTimeout( () => {
            mainchat?.scrollTo( 0, mainchat?.scrollHeight )
        }, 1000 )
     }, [ channelID, channels ] )

    return (
        <div className={ styles.chat_wrap }>
            <div 
                id={ 'mainchat' } 
                ref={ mainchatRef } 
                className={ styles.chat_message_display }
            >
            <UserIsTyping/>
                <AnimatePresence exitBeforeEnter>
                    {
                        // everything is reversed 
                        // cause the way messages are displayed 
                        // is reversed 
                        msgs.map( ( v: Msg, ind: number ) => (
                            channelID === v?.channelID && 
                            <motion.div 
                            key={ v.messageID }
                            transition={  { delay: ind * .01 } }
                            style={ { height: '1rem' } } 
                            initial={ { opacity: 0, transform: 'translate(10%, 0)', height: 'auto' } }
                            animate={ { opacity: 1, transform: 'translate(0%, 0)', width: 'auto' } }
                            exit={ { opacity: 0, transform: 'translate(-10%, 0)', height: 'auto' } }>
                            <DisplayMessage 
                                ind={ ind }
                                { ...v }
                            />
                            </motion.div>
                        ) )
                    }
                </AnimatePresence>
            </div>
            <ChatInput/>
        </div>
    )
}

export default DisplayChat