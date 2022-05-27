import Image from "next/image";
import { FC, MutableRefObject, useMemo, useRef } from "react";
import { styles } from "./ChatStyles";
import UploadImage from "./uploadImage";
import SendIcon from '../../../graphics/send.svg'
import { _io } from "../../constants/WebSocketsConstants";
import { useSubmit } from "./handleSubmit";
import { useAppSelector } from "../../store/hooks";
import { getChannelUsernameState } from "../../interfaces/mainchatInterfaces";
import { debounce, fromEvent, interval, map, mergeMap, of } from "rxjs";
import { useEffect } from "react";
import { useState } from "react";
import { useUserIsTyping } from "./userIsTyping";

const ChatInput: FC = () => {

    const inputRef = useRef<HTMLTextAreaElement | null>( null )
    const submit = useSubmit<MutableRefObject<HTMLTextAreaElement | null>>( inputRef )

    const typing = useUserIsTyping()
    useEffect( () => console.log( typing ), [ typing ] )

    const userIsTyping = of( 'is-typing' )

    const changeHeight = () => {
        if( !inputRef.current ) return

        const m = _io.pipe(
            mergeMap( 
                ( socket ) => userIsTyping
                .pipe(
                    map( data => ( { data, socket } ) )
                )
             )
        )

        m.subscribe( ( { data, socket } ) => {
            socket.emit( data, true )
        } )

        const off = inputRef.current.scrollHeight + 'px'
        inputRef.current.style.height = off
        if( inputRef.current.value.length === 0 ) inputRef.current.style.height = 'auto'
    }

    const selector = useAppSelector( 
        ( 
            { channelUsername }: getChannelUsernameState 
        ) => channelUsername?.name 
    )

    return (
        <div className={ styles.chat_input_wrap }>
            <UploadImage/>
            <textarea
            id="inp"
            rows={ 1 }
            ref={ inputRef }
            className={ styles.chat_input }
            placeholder={ `send a message to @${ selector }` } 
            onKeyDown={ submit }
            onChange={ changeHeight }
            />
            <div onClick={ submit } className={ styles.send_icon }>
                <Image
                src={ SendIcon }
                alt=""/>
            </div>
        </div>
    )
}

export default ChatInput