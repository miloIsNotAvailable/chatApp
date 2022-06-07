import { AnimatePresence } from "framer-motion";
import { FC } from "react";
import DisplayMenu from "../../../Navbar/menu/DisplayMenu";
import ChatInput from "../../chatInput";
import { styles } from "../../ChatStyles";
import UserIsTyping from "../../userIsTyping";
import DisplayCall from "../calls/DisplayCall";
import ReceivedCall from "../calls/receivedCall";

interface MainChatLayoutProps {
    children: JSX.Element | JSX.Element[]
}

const MainChatLayout: FC<MainChatLayoutProps> 
= ( { children } ) => {

    return (
        <div className={ styles.chat_wrap }>
        <DisplayMenu/>
        <DisplayCall/>
        <div 
            id={ 'mainchat' }  
            className={ styles.chat_message_display }
        >
        <UserIsTyping/>
        <ReceivedCall/>
            { children }  
        </div>
        <ChatInput/>             
    </div>
    )
}

export default MainChatLayout
