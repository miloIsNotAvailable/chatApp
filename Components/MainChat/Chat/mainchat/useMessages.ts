import { useCallback, useEffect } from "react"
import { useChatContext } from "../../../contexts/ChatContext"
import { IOObservable, SocketType } from "../../../interfaces/WebSocketsTypes"
import { MessageType } from "../../../store/interfaces"
import { listenToMessages } from "./listenToMessages"

type Msg = MessageType & { messageID: string }

export const useMessages: () => Msg[][] 
= () => {

    const { msgs, setMsg } = useChatContext()

    const handle = ( v: IOObservable<SocketType> ) => {
        setMsg( ( prev: any[] ): Msg[] => [ v, ...prev ] )

        setTimeout( () => {
            const mainchat = document.getElementById( 'mainchat' )
            mainchat?.scrollTo( 0, mainchat?.scrollHeight )
        }, 300 )
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const memoizeReceived = useCallback( () => listenToMessages( handle ), [] )
    useEffect( () => memoizeReceived, [ memoizeReceived ] )

    return [ msgs ]
}