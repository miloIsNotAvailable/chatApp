import { FC, useCallback, useContext, useEffect, useRef, useState } from "react";
import ChatInput from "../chatInput";
import { styles } from "../ChatStyles";
import { MessageType } from "../../../store/interfaces";
import { initializeSocket } from "./initializeSocket";
import { _io } from "../../../constants/WebSocketsConstants";
import { IOObservable, SocketType } from "../../../interfaces/WebSocketsTypes";
import { listenToMessages } from "./listenToMessages";
import { SessionRerouteContext } from "../../../contexts/context";
import UserIsTyping from "../userIsTyping";
import { AnimatePresence, motion } from 'framer-motion'
import { useUserInfo } from "../../../constants/userConstants";
import { Channel } from "@prisma/client";
import { v4 } from "uuid";
import { useFetch } from "../../FriendsList/FetchChannels";
import ReactMarkdown from "react-markdown";

type Msg = MessageType & { messageID: string }

const Chat: FC = () => {

    const [ initialMsg, setInitialMsg ] = useState( [] )
    const [ msg, setMsg ] = useState<Msg[] | []>( [] )
    const context = useContext( SessionRerouteContext ) || { id: '' }

    const { channelID  } = useUserInfo()
    const { channels } = useFetch<Channel[]>( '/api/get_channels', context )
    
    const mainchatRef = useRef<HTMLDivElement>( null )

    useEffect( () => { 
        
        if( !channels ) return 

        const e = channels.filter( ( { id }: any ) => id === channelID )[0]
        setInitialMsg( e?.message || [] )

        const mainchat = document.getElementById( 'mainchat' )
        setTimeout( () => {
            mainchat?.scrollTo( 0, mainchat?.scrollHeight )
        }, 1000 )
     }, [ channelID, channels ] )

    const handle = ( v: IOObservable<SocketType> ) => {
        setMsg( ( prev: any[] ): Msg[] => [ ...prev, v ] )

        setTimeout( () => {
            const mainchat = document.getElementById( 'mainchat' )
            mainchat?.scrollTo( 0, mainchat?.scrollHeight )
        }, 300 )
    }

    const memoizeReceived = useCallback( () => listenToMessages( handle ), [] )

    useEffect( () => memoizeReceived, [ memoizeReceived ] )
    useEffect(  () => {initializeSocket()}, []  )
    
    return (
        <div className={ styles.chat_wrap }>
            <div 
                id={ 'mainchat' } 
                ref={ mainchatRef } 
                className={ styles.chat_message_display }
            >
            <UserIsTyping/>
            <AnimatePresence>
                {
                    [...initialMsg, ...msg].map( ( { channelID, content, messageID }: Msg, ind: number ) => (
                        context.id === channelID && 
                        <motion.div 
                        key={ messageID }
                        transition={  { delay: ind * .01 } }
                        style={ { height: '1rem' } } 
                        initial={ { opacity: 0, transform: 'translate(10%, 0)', height: 'auto' } }
                        animate={ { opacity: 1, transform: 'translate(0%, 0)', width: 'auto' } }
                        exit={ { opacity: 0, transform: 'translate(-10%, 0)', height: 'auto' } }>
                            <div
                            className={ styles.chat_user_message_wrap } 
                            > 
                                <div className={ styles.chat_user_icon }/>
                                <div className={ styles.chat_user_msg }> 
                                <ReactMarkdown>
                                    { content } 
                                </ReactMarkdown>
                                </div>
                            </div>
                        </motion.div>
                    ) )
                }
            </AnimatePresence>
            </div>
            <ChatInput/>
        </div>
    )
}

export default Chat