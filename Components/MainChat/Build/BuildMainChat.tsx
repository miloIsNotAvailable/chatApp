import { FC, useContext } from "react";
import { SessionContext } from "../../contexts/context";
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
            {/* { JSON.stringify( sessionContext ) } */}
            <Navbar/>
        </div>
    )
}

export default BuildMainChat