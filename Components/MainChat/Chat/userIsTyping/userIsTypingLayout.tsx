import { FC } from "react";
import { styles } from "../ChatStyles";
import { motion } from 'framer-motion'

interface UserIsTypingProps {
    children?: JSX.Element | JSX.Element[] | string
}

const UserIsTypingLayout: FC<UserIsTypingProps> 
= ( { children } ) => {

    return(
        <motion.div className={ styles.user_is_typing }
        initial={ { transform: 'translate(0, -10%)' } }
        animate={ { transform: 'translate( 0, 0 )' } }
        exit={ { transform: 'translate( 0, -10% )' } }>
            { children }
        </motion.div>
    )
}

export default UserIsTypingLayout