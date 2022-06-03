import { Dispatch, Provider, SetStateAction, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { createContext } from "react"
import { useUserInfo } from "../constants/userConstants"
import { IOObservable, SocketType } from "../interfaces/WebSocketsTypes"
import { listenToMessages } from "../MainChat/Chat/mainchat/listenToMessages"
import { MessageType } from "../store/interfaces"

type Msg = MessageType & { messageID: string }

type msgType =  [] | Msg[]

type ChatMsgContext = {
    msg: msgType,
    setMsg: Dispatch<SetStateAction<msgType>>
} 

type ChatContextType =  {
    msgs: Msg[];
    setMsg: Dispatch<SetStateAction<msgType>>;
    ChatContextProvider: Provider<ChatMsgContext>;
}

const ChatContext = createContext<ChatMsgContext>( {
    msg: [],
    setMsg: () => {}
} )

export const useChatContext = (): ChatContextType => {

    const [ initialMsg, setInitialMsg ] = useState( [] )
    const { channelID, channels } = useUserInfo()
    
    useEffect( () => { 
        
        if( !channels ) return 

        const e = channels.filter( ( { id }: any ) => id === channelID )[0]
        setInitialMsg( e?.message || [] )

     }, [ channelID, channels ] )

     const msgContext = useContext( ChatContext )
     const { msg, setMsg } = msgContext

     return {
         msgs: [ ...msg, ...initialMsg ],
         setMsg, 
         ChatContextProvider: ChatContext.Provider
     }
}
