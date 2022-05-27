import Image from "next/image";
import { FC, MutableRefObject, useMemo, useRef } from "react";
import { styles } from "../ChatStyles";
import UploadImage from "./uploadImage";
import SendIcon from '../../../../graphics/send.svg'
import { _io } from "../../../constants/WebSocketsConstants";
import { useSubmit } from "./handleSubmit";
import MainChatTextarea from "./chatTextarea";

const ChatInput: FC = () => {

    const inputRef = useRef<HTMLTextAreaElement | null>( null )
    const submit = useSubmit<MutableRefObject<HTMLTextAreaElement | null>>( inputRef )

    return (
        <div className={ styles.chat_input_wrap }>
            <UploadImage/>
            <MainChatTextarea inputRef={ inputRef } />
            <div onClick={ submit } className={ styles.send_icon }>
                <Image
                src={ SendIcon }
                alt=""/>
            </div>
        </div>
    )
}

export default ChatInput