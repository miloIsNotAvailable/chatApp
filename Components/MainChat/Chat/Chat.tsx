import { FC, useEffect, useState } from "react";
import ChatInput from "./ChatInput";
import { styles } from "./ChatStyles";
import io from 'socket.io-client'
import { MessageType } from "../../store/interfaces";
import { initializeSocket } from "./initializeSocket";
import { useAppSelector } from "../../store/hooks";
import { Observable, of } from "rxjs";

type newMessageState = {
    createMessage: MessageType
}

const Chat: FC = () => {

    const selector = useAppSelector( ( { createMessage }: newMessageState ) => createMessage )
    const [ message, setMessage ] = useState<Observable<MessageType> | null>( null )
    const [ msg, setMsg ] = useState<MessageType[] | []>( [] )

    useEffect(  () => {initializeSocket()}, []  )

    useEffect(  () => {
        setMessage( of( selector ) )
    }, [ selector ]  )

    useEffect( () => {
        message?.subscribe( v => setMsg( ( prev: any ) => [ ...prev, v ] ) )
    }, [ message ] )

    return (
        <div className={ styles.chat_wrap }>
            <div className={ styles.chat_message_display }>
                {
                    msg.map( ( { message }: MessageType ) => (
                        <div key={ message }> { message } </div>
                    ) )
                }
            </div>
            <ChatInput/>
        </div>
    )
}

export default Chat