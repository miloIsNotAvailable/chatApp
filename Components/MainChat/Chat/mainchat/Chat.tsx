import { FC, useCallback, useContext, useEffect, useRef, useState } from "react";
import ChatInput from "../chatInput";
import { MessageType } from "../../../store/interfaces";
import { initializeSocket } from "./initializeSocket";
import { _io } from "../../../constants/WebSocketsConstants";
import DisplayChat from './DisplayChat'
import { useChatContext } from "../../../contexts/CHatContext";

type Msg = MessageType & { messageID: string }

const Chat: FC = () => {

    const [ msg, setMsg ] = useState<Msg[] | []>( [] )
    const { ChatContextProvider } = useChatContext()
    
    useEffect(  () => {initializeSocket()}, []  )
    
    return (
        <ChatContextProvider value={ { msg, setMsg } }>
            <DisplayChat/>
        </ChatContextProvider>
    )
}

export default Chat