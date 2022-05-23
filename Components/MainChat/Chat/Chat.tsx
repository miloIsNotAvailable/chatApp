import { FC, useEffect } from "react";
import ChatInput from "./ChatInput";
import { styles } from "./ChatStyles";
import io from 'socket.io-client'

const Chat: FC = () => {

    const initializeSocket = async() => {

        fetch( '/api/sockets/messages' )
        const IO = io()

        IO.on( 'connect', () => console.log( 'socket connected' ) )
    }

    useEffect(  () => {initializeSocket()}, []  )

    return (
        <div className={ styles.chat_wrap }>
            <ChatInput/>
        </div>
    )
}

export default Chat