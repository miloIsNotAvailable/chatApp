import { FC, useCallback, useEffect, useState } from "react";
import ChatInput from "./ChatInput";
import { styles } from "./ChatStyles";
import io from 'socket.io-client'
import { MessageType } from "../../store/interfaces";
import { initializeSocket } from "./initializeSocket";
import { useAppSelector } from "../../store/hooks";
import { map, mergeMap, Observable } from "rxjs";
import { fromEvent } from 'rxjs'
import { _io } from "../../constants/WebSocketsConstants";
import { IOObservable, SocketType } from "../../interfaces/WebSocketsTypes";

type newMessageState = {
    createMessage: MessageType
}

const Chat: FC = () => {

    const selector = useAppSelector( ( { createMessage }: newMessageState ) => createMessage )
    const [ message, setMessage ] = useState<Observable<MessageType> | null>( null )
    const [ msg, setMsg ] = useState<MessageType[] | []>( [] )
    const socket = io()

    const getVal = ( v: any ) => console.log( v )
    const e = useCallback( getVal, [] )

    useEffect( () => {
        // socket.on( "msg", e )
        const m: Observable<IOObservable<SocketType>> = _io.pipe( 
            mergeMap( ( client ) => 
              fromEvent( client, 'msg' ).pipe(
                map(
                  ( data ) => data
                )
              )
             ) 
          )
      
        m.subscribe( console.log )
    } )

    useEffect(  () => {initializeSocket()}, []  )
    
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