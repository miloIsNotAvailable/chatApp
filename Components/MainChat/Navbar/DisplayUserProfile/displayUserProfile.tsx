import { FC, useContext } from "react";
import { getChannelUsernameState } from "../../../interfaces/mainchatInterfaces";
import { useAppSelector } from "../../../store/hooks";
import { styles } from "../Build/NavbarStyles";
import { motion } from "framer-motion";

const DisplayUser: FC = () => {

    const selector = useAppSelector( 
        ( 
            { channelUsername }: getChannelUsernameState 
        ) => channelUsername?.name 
    )

    return (
        <div className={  styles.display_user }>
            <div className={ styles.user_profile }>
                
            </div>
            <div className={ styles.align_username }>
                { selector }
            </div>
        </div>
    )
}

export default DisplayUser