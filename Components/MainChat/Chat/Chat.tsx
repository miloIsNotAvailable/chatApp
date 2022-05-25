import { FC, useCallback, useContext, useEffect, useState } from "react";
import ChatInput from "./ChatInput";
import { styles } from "./ChatStyles";
import { MessageType } from "../../store/interfaces";
import { initializeSocket } from "./initializeSocket";
import { _io } from "../../constants/WebSocketsConstants";
import { IOObservable, SocketType } from "../../interfaces/WebSocketsTypes";
import { listenToMessages } from "./listenToMessages";
import { SessionRerouteContext } from "../../contexts/context";

const Chat: FC = () => {

    const [ msg, setMsg ] = useState<MessageType[] | []>( [] )
    const { id } = useContext( SessionRerouteContext ) || { id: '' }

    const handle = ( v: IOObservable<SocketType> ) => 
    setMsg( ( prev: any[] ): MessageType[] => [ ...prev, v ] )

    const memoizeReceived = useCallback( () => listenToMessages( handle ), [] )

    useEffect( () => memoizeReceived, [ memoizeReceived ] )
    useEffect(  () => {initializeSocket()}, []  )
    
    return (
        <div className={ styles.chat_wrap }>
            <div className={ styles.chat_message_display }>
                {
                    msg.map( ( { msg, room }: MessageType ) => (
                        id === room && 
                        <div key={ msg }> { msg } </div>
                    ) )
                }
            </div>
            <ChatInput/>
        </div>
    )
}

export default Chat