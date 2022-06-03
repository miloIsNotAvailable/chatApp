import { FC, useCallback, useContext, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from 'framer-motion'
import DisplayMessage from "./displayMessage";
import UserIsTyping from "../userIsTyping";
import ChatInput from "../chatInput";
import { styles } from "../ChatStyles";
import { MessageType } from "../../../store/interfaces";
import { useUserInfo } from "../../../constants/userConstants";
import ReceivedCall from "./receivedCall";
import DisplayCall from "./DisplayCall";
import Image from "next/image";
import newMessage from "../../../../graphics/newMessage.svg";
import { useAppSelector } from "../../../store/hooks";
import { getChannelUsernameState } from "../../../interfaces/mainchatInterfaces";
import { useMessages } from "./useMessages";
import { usePagination } from "./pagination/usePagination";
import { _io } from "../../../constants/WebSocketsConstants";

type Msg = MessageType & { messageID: string }

const DisplayChat: FC = () => {
 
    const { channelID, channels  } = useUserInfo()        
    const [ msgs ] = useMessages()

    const { more, setPaginate } = usePagination( msgs )

    const mainchatRef = useRef<HTMLDivElement>( null )
    const msgRef = useRef<HTMLDivElement | any>( null )

    const selector = useAppSelector( 
        ( 
            { channelUsername }: getChannelUsernameState 
        ) => channelUsername?.name 
    )

    useEffect( () => { 
        const mainchat = document.getElementById( 'mainchat' )
        setTimeout( () => {
            mainchat?.scrollTo( 0, mainchat?.scrollHeight )
        }, 1000 )
     }, [ channelID, channels ] )

    useEffect( () => {
        if( !mainchatRef.current ) return
        
        mainchatRef.current.onscroll = () => {
            if( !mainchatRef.current ) return
            
            const { scrollTop, offsetHeight, scrollHeight } = mainchatRef.current

            if( scrollHeight + scrollTop === offsetHeight + 1 ){
                setPaginate( msgs ) 
            } 
        }
    } )

    if( msgs.length === 0 ) return (
        <div className={ styles.chat_wrap }>
        <DisplayCall/>
        <div 
            id={ 'mainchat' } 
            ref={ mainchatRef } 
            className={ styles.chat_message_display }>
            <AnimatePresence exitBeforeEnter>
                <motion.div
                    initial={ { opacity: 0, transform: 'translate(10%, 0)' } }
                    animate={ { opacity: 1, transform: 'translate(0%, 0)' } }
                    exit={ { opacity: 0, transform: 'translate(-10%, 0)'} } 
                    className={ styles.chat_conversation_wrap } 
                    key="start new conversation">
                    <div className={ styles.chat_start_conversation }>
                        <Image
                            src={ newMessage }
                            alt=""
                        />
                        <p>
                            send a message to @{ selector }
                        </p>
                    </div>
                </motion.div>
                </AnimatePresence>
            </div>
        <ChatInput/>
    </div>
    )

    return (
        <div className={ styles.chat_wrap }>
            <DisplayCall/>
            <div 
                id={ 'mainchat' } 
                ref={ mainchatRef } 
                className={ styles.chat_message_display }
                // onScroll={ handleScroll }
            >
            <UserIsTyping/>
            <ReceivedCall/>
                <AnimatePresence exitBeforeEnter>
                    {
                        // everything is reversed 
                        // cause the way messages are displayed 
                        // is reversed 
                        [...msgs, ...more].map( ( v: Msg, ind: number ) => (
                            channelID === v?.channelID && 
                            <motion.div 
                                key={ v.messageID }
                                ref={ msgRef }
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