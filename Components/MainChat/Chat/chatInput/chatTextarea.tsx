import { FC, MutableRefObject } from "react";
import { map, mergeMap, of } from "rxjs";
import { useUserInfo } from "../../../constants/userConstants";
import { _io } from "../../../constants/WebSocketsConstants";
import { getChannelUsernameState } from "../../../interfaces/mainchatInterfaces";
import { useAppSelector } from "../../../store/hooks";
import { styles } from "../ChatStyles";
import { useSubmit } from "./handleSubmit";

interface MainChatTextareaProps {
    inputRef: MutableRefObject<HTMLTextAreaElement | null>
}

const MainChatTextarea: FC<MainChatTextareaProps> 
= ( { inputRef } ) => {

    const submit = useSubmit<MutableRefObject<HTMLTextAreaElement | null>>( inputRef )
    const { name, channelID } = useUserInfo()

    const selector = useAppSelector( 
        ( 
            { channelUsername }: getChannelUsernameState 
        ) => channelUsername?.name 
    )

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
            socket.emit( data, { name, isTyping: true, channelID } )
        } )

        const off = inputRef.current.scrollHeight + 'px'
        inputRef.current.style.height = off
        if( inputRef.current.value.length === 0 ) inputRef.current.style.height = 'auto'
    }

    return (
        <textarea
        id="inp"
        rows={ 1 }
        ref={ inputRef }
        className={ styles.chat_input }
        placeholder={ `send a message to @${ selector }` } 
        onKeyDown={ submit }
        onChange={ changeHeight }
        />
    )
}

export default MainChatTextarea