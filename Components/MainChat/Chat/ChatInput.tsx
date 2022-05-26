import Image from "next/image";
import { FC, FormEvent, KeyboardEvent, MouseEvent, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { styles } from "./ChatStyles";
import UploadImage from "./uploadImage";
import SendIcon from '../../../graphics/send.svg'
import io from 'socket.io-client'
import { map, mergeMap, Observable, of } from "rxjs";
import { useAppDispatch } from "../../store/hooks";
import { newMessage } from "../../store/createMessage";
import { SessionReroute, SessionRerouteContext } from "../../contexts/context";
import { _io } from "../../constants/WebSocketsConstants";
import { motion } from 'framer-motion'

type evType = KeyboardEvent<HTMLTextAreaElement> | MouseEvent<HTMLDivElement, globalThis.MouseEvent>
const evIsMouse = ( e: evType ): 
e is MouseEvent<HTMLDivElement> => {
    let c = e as MouseEvent<HTMLDivElement>
    return typeof c.pageX === 'number'
}

const evIsKey = ( e: evType ): 
e is KeyboardEvent<HTMLTextAreaElement> => {
    const c = e as KeyboardEvent<HTMLTextAreaElement>
    return typeof c.key === 'string'
}

const ChatInput: FC = () => {

    const sessionContext = useContext( SessionRerouteContext )
    const IdObservable: Observable<SessionReroute | null> = of( sessionContext?.id )

    const inputRef = useRef<HTMLTextAreaElement | null>( null )

    const dispatch = useAppDispatch()

    const handleSubmit = ( 
        e: evType
        ) => {
        if( 
            !inputRef.current?.value?.trim() || 
            (evIsKey( e ) && e.key !== 'Enter') ||
            (evIsKey( e ) && e.key === 'Enter' && e.shiftKey)
        ) return
        
        e.preventDefault()
        
        const m = _io.pipe( 
            mergeMap( 
                socket => IdObservable.pipe(
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

        // socket.emit( 'message', inputRef.current?.value?.trim() )

        dispatch( newMessage( { msg: inputRef.current?.value?.trim(), room: '' } ) )
        if( inputRef.current ) inputRef.current.value = ''
        inputRef.current.style.height = 'auto'
    }
    // const handleSubmit = ( 
    //     e: FormEvent<HTMLFormElement> | MouseEvent<any>
    //     ) => Submit( e, inputRef, dispatch, socket, newMessage )

    const changeHeight = () => {
        if( !inputRef.current ) return
        
        let off = inputRef.current?.scrollHeight
        console.log( off, inputRef.current?.scrollHeight )

        inputRef.current.style.height = off + 'px'
        if( inputRef.current.value.length === 0 ) inputRef.current.style.height = 'auto'
    }

    return (
        <div className={ styles.chat_input_wrap }>
            <UploadImage/>
            <textarea
            rows={ 1 }
            ref={ inputRef }
            className={ styles.chat_input }
            placeholder={ "send a message" } 
            onKeyDown={ handleSubmit }
            onChange={ changeHeight }/>
            <div onClick={ e => evIsMouse( e ) && handleSubmit( e ) } className={ styles.send_icon }>
                <Image
                src={ SendIcon }
                alt=""/>
            </div>
        </div>
    )
}

export default ChatInput