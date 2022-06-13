import Image from "next/image";
import { FC, MutableRefObject, useMemo, useRef } from "react";
import { styles } from "../ChatStyles";
import UploadImage from "./uploadImage";
import SendIcon from '../../../../graphics/send.svg'
import { _io } from "../../../constants/WebSocketsConstants";
import { useSubmit } from "./handleSubmit/handleSubmit";
import MainChatTextarea from "./chatTextarea";
import { useAppSelector } from "../../../store/hooks";
import { getChannelUsernameState } from "../../../interfaces/mainchatInterfaces";

const ChatInput: FC = () => {

    const inputRef = useRef<HTMLDivElement | null>( null )
    const submit = useSubmit<MutableRefObject<HTMLDivElement | null>>( inputRef )

    const selector = useAppSelector( 
        ( 
            { channelUsername }: getChannelUsernameState 
        ) => channelUsername?.name 
    )

    if( !selector ) return (
        <div className={ styles.chat_input_wrap }>
            <UploadImage/>
            <div></div>
            {/* <MainChatTextarea inputRef={ inputRef } /> */}
            <div onClick={ () => {} } className={ styles.send_icon }>
                <Image
                src={ SendIcon }
                alt=""/>
            </div>
        </div>
    )

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