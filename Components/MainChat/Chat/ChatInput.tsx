import Image from "next/image";
import { FC, FormEvent, MouseEvent, useEffect, useRef } from "react";
import { styles } from "./ChatStyles";
import UploadImage from "./uploadImage";
import SendIcon from '../../../graphics/send.svg'
import io from 'socket.io-client'

const ChatInput: FC = () => {

    const inputRef = useRef<HTMLInputElement | null>( null )
    const socket = io()

    const handleSubmit = ( 
        e: FormEvent<HTMLFormElement> | MouseEvent
        ) => {
        if( !inputRef.current?.value?.trim() ) return
        e.preventDefault()
        
        socket.emit( 'message', inputRef.current?.value?.trim() )
    }

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