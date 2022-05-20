import { FC, useContext } from "react";
import { SessionContext } from "../../contexts/context";
import FriendList from "../FriendsList/FriendList";
import Navbar from "../Navbar";
import { styles } from "./MainChatStyles";

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
                <FriendList/>
            </div>
        </div>
    )
}

export default BuildMainChat