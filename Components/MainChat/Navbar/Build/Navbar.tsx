import { FC } from "react";
import DisplayUser from "../DisplayUserProfile/displayUserProfile";
import { styles } from "./NavbarStyles";
import Search from "../Search/Search";
import CallAndMenu from "./CallAndMenu";
import { AnimatePresence, motion } from "framer-motion";
import { useUserInfo } from "../../../constants/userConstants";

const Navbar: FC = () => {

    const { channelID } = useUserInfo()

    return (
        <div  
         key={ channelID } 
        className={ styles.navbar_display }>
            <Search/>
            <div
            className={ styles.display_right }>
                <DisplayUser/>
                <CallAndMenu/>
            </div>
        </div>
    )
}

export default Navbar