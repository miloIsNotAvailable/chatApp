import { useRef } from "react";
import { useEffect } from "react";
import { FC, MutableRefObject } from "react";
import { map, mergeMap, of } from "rxjs";
import { useUserInfo } from "../../../constants/userConstants";
import { _io } from "../../../constants/WebSocketsConstants";
import { getChannelUsernameState } from "../../../interfaces/mainchatInterfaces";
import { useAppSelector } from "../../../store/hooks";
import { styles } from "../ChatStyles";
import { useEmitOnChange } from "../userIsTyping/emitOnChange";
import { useSubmit } from "./handleSubmit/handleSubmit";
import { useFileDrop } from "./onFileDrop";

interface MainChatTextareaProps {
    inputRef: MutableRefObject<HTMLDivElement | null>
}

const MainChatTextarea: FC<MainChatTextareaProps> 
= ( { inputRef } ) => {

    const editRef = useRef<HTMLDivElement | null>( null )
    const submit = useSubmit<MutableRefObject<HTMLDivElement | null>>( inputRef )

    const getOnChange = useEmitOnChange( inputRef )

    const selector = useAppSelector( 
        ( 
            { channelUsername }: getChannelUsernameState 
        ) => channelUsername?.name 
    )

    const dropFiles = useFileDrop( inputRef )
    
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
        onChange={ emitOnChange }
        /> */}
        <div
            contentEditable
            id="inp"
            ref={ inputRef }
            className={ styles.chat_input }
            onDrop={ dropFiles }
            onKeyDown={ submit }
            onInput={ getOnChange }
            placeholder={ `send a message to @${ selector }` }
        />
        </>
    )
}

export default MainChatTextarea