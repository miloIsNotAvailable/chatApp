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

type Msg = {
    data: MessageType, 
    id: string
}

const Chat: FC = () => {

    const [ msg, setMsg ] = useState<Msg[] | []>( [] )
    const context = useContext( SessionRerouteContext ) || { id: '' }

    const handle = ( v: IOObservable<SocketType> ) => 
    setMsg( ( prev: any[] ): Msg[] => [ ...prev, v ] )

    const memoizeReceived = useCallback( () => listenToMessages( handle ), [] )

    useEffect( () => memoizeReceived, [ memoizeReceived ] )
    useEffect(  () => {initializeSocket()}, []  )
    
    return (
        <div className={ styles.chat_wrap }>
            <div className={ styles.chat_message_display }>
            <UserIsTyping/>
                {
                    msg.map( ( { data: { room, msg }, id }: Msg ) => (
                        context.id === room && 
                        <div 
                            className={ styles.chat_user_message_wrap } 
                            key={ id }> 
                            <div className={ styles.chat_user_icon }/>
                            <div className={ styles.chat_user_msg }> { msg } </div>
                        </div>
                    ) )
                }
            </div>
            <ChatInput/>
        </div>
    )
}

export default Chat