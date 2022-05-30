import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
import { createContext } from "react"
import { useUserInfo } from "../constants/userConstants"
import { MessageType } from "../store/interfaces"

type Msg = MessageType & { messageID: string }

type msgType =  [] | Msg[]

type ChatMsgContext = {
    msg: msgType,
    setMsg: Dispatch<SetStateAction<msgType>>
} 

const ChatContext = createContext<ChatMsgContext>( {
    msg: [],
    setMsg: () => {}
} )

export const useChatContext = () => {

    const [ initialMsg, setInitialMsg ] = useState( [] )
    const { channelID, channels  } = useUserInfo()

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