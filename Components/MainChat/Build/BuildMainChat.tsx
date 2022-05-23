import { FC, useContext } from "react";
import { SessionContext } from "../../contexts/context";
import Chat from "../Chat/Chat";
import FriendList from "../FriendsList/FriendList";
import Navbar from "../Navbar";
import Settings from "../Settings/Settings";
import { styles } from "./MainChatStyles";
import { MessageType } from "../../store/interfaces";

type newMessageState = {
    newMessage: MessageType
}


const BuildMainChat: FC = () => {
    
    /**
     * @param sessionContext
     * @returns a jwt session token 
     * containing email, id and username 
     */

    const sessionContext = useContext( SessionContext )

    return (
        <div className={ styles.mainchat_display }>
            <Navbar/>
            <div className={ styles.mainchat_body }>
                <div className={ styles.sidebar }>
                    <FriendList/>
                    <Settings/>
                </div>
                <Chat/>
            </div>
        </div>
    )
}

export default BuildMainChat