import { FC, useContext } from "react";
import { getChannelUsernameState } from "../../../interfaces/mainchatInterfaces";
import { useAppSelector } from "../../../store/hooks";
import { styles } from "../Build/NavbarStyles";
import { motion, AnimatePresence } from "framer-motion";
import { useUserInfo } from "../../../constants/userConstants";

const DisplayUser: FC = () => {

    const { channelID } = useUserInfo()
    const selector = useAppSelector( 
        ( 
            { channelUsername }: getChannelUsernameState 
        ) => channelUsername?.name 
    )

    return (
        <AnimatePresence exitBeforeEnter>
        <div className={  styles.display_user }>
            <div className={ styles.user_profile }>
                
            </div>
            <motion.div
            key={ selector }
            initial={ { opacity: 0, transform: 'translate(100%, 0)' } }
            animate={ { opacity: 1, transform: 'translate(0%, 0)' } }
            exit={ { opacity: 0, transform: 'translate(-100%, 0)' } }
            className={ styles.align_username }>
                { selector }
            </motion.div>
        </div>
        </AnimatePresence>
    )
}

export default DisplayUser