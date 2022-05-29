import { FC } from "react";
import { styles } from "../ChatStyles";
import { AnimatePresence, motion } from 'framer-motion'

interface UserIsTypingProps {
    children?: JSX.Element | JSX.Element[] | string;
}

const UserIsTypingLayout: FC<UserIsTypingProps> 
= ( { children } ) => {

    return(
        <motion.div className={ styles.user_is_typing }
        initial={ {opacity: 0 } }
        animate={ { opacity: 1 } }
        exit={ { opacity: 0 } }>
            { children }
        </motion.div>
    )
}

export default UserIsTypingLayout