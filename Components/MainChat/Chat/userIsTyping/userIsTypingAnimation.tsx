import { FC } from "react";
import { motion } from 'framer-motion'
import { styles } from "../ChatStyles";

interface UserIsTypingAnimationProps {
    ind: number
}

const UserIsTypingAnimation: FC<UserIsTypingAnimationProps> 
= ( { ind } ) => {

    return (
        <motion.div
            // transition={ { delay: ind * .1 } }
            initial={ { transform: 'translate(0, 100%)' } }
            animate={ { transform: 'translate( 0, 0 )' } }
            exit={ { transform: 'translate( 0, 100% )'} }
            style={ { animationDelay: ind * .1 + 's' } }
            key={ ind }
            className={ styles.user_is_typing_ellipse }/>
    )
}

export default UserIsTypingAnimation