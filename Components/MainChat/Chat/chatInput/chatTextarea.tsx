import { useRef } from "react";
import { useEffect } from "react";
import { FC, MutableRefObject } from "react";
import { map, mergeMap, of } from "rxjs";
import { useUserInfo } from "../../../constants/userConstants";
import { _io } from "../../../constants/WebSocketsConstants";
import { getChannelUsernameState } from "../../../interfaces/mainchatInterfaces";
import { useAppSelector } from "../../../store/hooks";
import { styles } from "../ChatStyles";
import { evIsKey, triggerSubmit, useSubmit } from "./handleSubmit";
import { fileDrop } from "./onFileDrop";

interface MainChatTextareaProps {
    inputRef: MutableRefObject<HTMLTextAreaElement | null>
}

const MainChatTextarea: FC<MainChatTextareaProps> 
= ( { inputRef } ) => {

    const editRef = useRef<HTMLDivElement | null>( null )
    const submit = useSubmit<MutableRefObject<HTMLDivElement | null>>( editRef )
    const { name, channelID } = useUserInfo()

    const selector = useAppSelector( 
        ( 
            { channelUsername }: getChannelUsernameState 
        ) => channelUsername?.name 
    )

    const userIsTyping = of( 'is-typing' )

    const changeHeight = () => {
        if( !editRef.current ) return

        const m = _io.pipe(
            mergeMap( 
                ( socket ) => userIsTyping
                .pipe(
                    map( data => ( { data, socket } ) )
                )
             )
        )

        m.subscribe( ( { data, socket } ) => {
            socket.emit( data, { name, isTyping: true, channelID } )
        } )
    }

    return (
        <>
        {/* <textarea
        contentEditable
        id="inp"
        rows={ 1 }
        ref={ inputRef }
        className={ styles.chat_input }
        placeholder={ `send a message to @${ selector }` } 
        onKeyDown={ submit }
        onChange={ changeHeight }
        /> */}
        <div
            contentEditable
            id="inp"
            ref={ editRef }
            className={ styles.chat_input }
            onDrop={ e => fileDrop(e, editRef) }
            onKeyDown={ e => {submit( e ); changeHeight()} }
        />
        </>
    )
}

export default MainChatTextarea