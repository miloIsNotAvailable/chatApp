import Image from "next/image";
import { FC, FormEvent, MouseEvent, useContext, useEffect, useRef, useState } from "react";
import { styles } from "./ChatStyles";
import UploadImage from "./uploadImage";
import SendIcon from '../../../graphics/send.svg'
import io from 'socket.io-client'
import { map, mergeMap, Observable, of } from "rxjs";
import { useAppDispatch } from "../../store/hooks";
import { newMessage } from "../../store/createMessage";
import { SessionRerouteContext } from "../../contexts/context";
import { _io } from "../../constants/WebSocketsConstants";

const ChatInput: FC = () => {

    const sessionContext = useContext( SessionRerouteContext )
    const f = of( sessionContext?.id )

    const inputRef = useRef<HTMLInputElement | null>( null )
    const socket = io()
    const[ obs, setObs ] = useState<Observable<string> | null>( null )

    const dispatch = useAppDispatch()

    const handleSubmit = ( 
        e: FormEvent<HTMLFormElement> | MouseEvent
        ) => {
        if( !inputRef.current?.value?.trim() ) return
        e.preventDefault()
        
        const m = _io.pipe( 
            mergeMap( 
                socket => f.pipe(
                    map( data => ( { socket, data } ) )
                ) 
            )
        )

        m.subscribe( ( { data, socket } ) => {
            console.log( data )
            socket.emit( 'pm', { 
                room: data, 
                msg: inputRef.current?.value?.trim() 
            } )
        } )

        socket.emit( 'message', inputRef.current?.value?.trim() )

        dispatch( newMessage( { msg: inputRef.current?.value?.trim(), room: '' } ) )
        if( inputRef.current ) inputRef.current.value = ''
    }

    // const handleSubmit = ( 
    //     e: FormEvent<HTMLFormElement> | MouseEvent<any>
    //     ) => Submit( e, inputRef, dispatch, socket, newMessage )

    return (
        <form  onSubmit={ handleSubmit } className={ styles.chat_input_wrap }>
            <UploadImage/>
            <input 
            ref={ inputRef }
            className={ styles.chat_input }
            placeholder={ "send a message" }/>
            <div  onClick={ handleSubmit } className={ styles.send_icon }>
                <Image
                src={ SendIcon }
                alt=""/>
            </div>
        </form>
    )
}

export default ChatInput