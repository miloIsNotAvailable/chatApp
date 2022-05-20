import { FC } from "react";
import ChatInput from "./ChatInput";
import { styles } from "./ChatStyles";

const Chat: FC = () => {

    return (
        <div className={ styles.chat_wrap }>
            <ChatInput/>
        </div>
    )
}

export default Chat