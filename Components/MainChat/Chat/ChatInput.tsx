import Image from "next/image";
import { FC } from "react";
import { styles } from "./ChatStyles";
import UploadImage from "./uploadImage";
import SendIcon from '../../../graphics/send.svg'

const ChatInput: FC = () => {

    return (
        <div className={ styles.chat_input_wrap }>
            <UploadImage/>
            <input 
            className={ styles.chat_input }
            placeholder={ "send a message" }/>
            <div className={ styles.send_icon }>
                <Image
                src={ SendIcon }
                alt=""/>
            </div>
        </div>
    )
}

export default ChatInput