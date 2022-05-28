import { FC, useCallback, useContext, useEffect, useState } from "react";
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

type Msg = {
    data: MessageType, 
    id: string
}

const Chat: FC = () => {

    const [ msg, setMsg ] = useState<Msg[] | []>( [] )
    const context = useContext( SessionRerouteContext ) || { id: '' }

    const { channelID } = useUserInfo()

    const handle = ( v: IOObservable<SocketType> ) => 
    setMsg( ( prev: any[] ): Msg[] => [ ...prev, v ] )

    const memoizeReceived = useCallback( () => listenToMessages( handle ), [] )

    useEffect( () => memoizeReceived, [ memoizeReceived ] )
    useEffect(  () => {initializeSocket()}, []  )
    
    return (
        <div className={ styles.chat_wrap }>
            <div className={ styles.chat_message_display }>
            <UserIsTyping/>
            <AnimatePresence exitBeforeEnter>
                {
                    msg.map( ( { data: { room, msg }, id }: Msg, ind: number ) => (
                        context.id === room && 
                        <motion.div 
                            key={ channelID }
                            transition={  { delay: ind * .01 } }
                            style={ { overflowX: 'hidden' } } 
                            initial={ { opacity: 0, transform: 'translate(10%, 0)', height: 'auto' } }
                            animate={ { opacity: 1, transform: 'translate(0%, 0)', width: 'auto' } }
                            exit={ { opacity: 0, transform: 'translate(-10%, 0)', height: 'auto' } }>
                            <div
                            className={ styles.chat_user_message_wrap } 
                            key={ id }> 
                                <div className={ styles.chat_user_icon }/>
                                <div className={ styles.chat_user_msg }> 
                                    { msg } 
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