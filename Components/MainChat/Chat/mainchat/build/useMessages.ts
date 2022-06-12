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

    // get current channelID
    useEffect( () => {
        channelRef.current = channelID
    }, [ channelID ] )

    const dispatch = useAppDispatch()

    const handle = useCallback(( v: IOObservable<SocketType> ) => {
        setMsg( ( prev: any[] ): Msg[] => [ v, ...prev ] )

        setTimeout( () => {
            const mainchat = document.getElementById( 'mainchat' )
            mainchat?.scrollTo( 0, mainchat?.scrollHeight )
        }, 300 )

        
        const e: any = v;
        /**
         * check the amount of unread
         * messages by checking the length 
         * of messages in chat ( 10 by default )
         */
        msgsRef.current = [ ...msgsRef.current, v ]

        // reset on read
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
    }, [ setMsg, dispatch, name ])

    // this works for develpoment
    const memoizeReceived = useCallback( () => listenToMessages( handle ), [ handle ] )
    // useEffect( () => memoizeReceived, [ memoizeReceived ] )
    
    // this works for production
    useEffect( () => listenToMessages( handle ), [ handle ] )
    
    /**
     * reset msgs array cause upon reentering the channel
     * evevrything gets cached, so new data 
     * would get displayed twice
     */
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect( () => setMsg( [] ), [ channelID ] )

    // returns new messages and initial messages
    return [ msgs ]
}