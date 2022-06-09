import { useCallback, useEffect, useRef, useState } from "react"
import { useUserInfo } from "../../../../constants/userConstants"
import { useChatContext } from "../../../../contexts/ChatContext"
import { IOObservable, SocketType } from "../../../../interfaces/WebSocketsTypes"
import { messageIsUnread } from "../../../../store/checkForReadMessages"
import { useAppDispatch } from "../../../../store/hooks"
import { MessageType } from "../../../../store/interfaces"
import { listenToMessages } from "../listenToMessages"

type Msg = MessageType & { messageID: string }

export const useMessages: () => Msg[][] 
= () => {

    const { msgs, setMsg } = useChatContext()
    
    const { channelID, name } = useUserInfo()
    const channelRef = useRef<string | null>( channelID )
    const msgsRef = useRef<any[]>( [] )

    useEffect( () => {
        channelRef.current = channelID
        console.log( channelID, channelRef.current )
    }, [ channelID ] )

    // useEffect( () => {
    //     msgsRef.current = msgs.length
    // }, [ msgs ] )

    const dispatch = useAppDispatch()

    const handle = ( v: IOObservable<SocketType> ) => {
        setMsg( ( prev: any[] ): Msg[] => [ v, ...prev ] )

        setTimeout( () => {
            const mainchat = document.getElementById( 'mainchat' )
            mainchat?.scrollTo( 0, mainchat?.scrollHeight )
        }, 300 )

        
        const e: any = v;
        msgsRef.current = [ ...msgsRef.current, v ]

        if( channelRef.current === e?.channelID ) msgsRef.current=[]

        dispatch( 
            messageIsUnread(
                {
                    unread: e?.from === name || channelRef.current === e?.channelID ? false : true,
                    channelID: e?.channelID,
                    unreadMsgs: msgsRef.current.length > 9 ? '9+' : msgsRef.current.length
                }
            ) 
        )
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const memoizeReceived = useCallback( () => listenToMessages( handle ), [] )
    useEffect( () => memoizeReceived, [ memoizeReceived ] )

    return [ msgs ]
}