import { FC } from "react";
import { motion } from "framer-motion";

interface TransitionPagesProps {
    ind: number, 
    v: any, 
    children: JSX.Element | JSX.Element[]
}

const TransitionPages: FC<TransitionPagesProps> 
= ( { children, ind, v } ) => {

    return (
        <motion.div 
            key={ v.messageID }
            transition={  { delay: ind * .01 } }
            style={ { height: '1rem' } } 
            initial={ { opacity: 0, transform: 'translate(10%, 0)', height: 'auto' } }
            animate={ { opacity: 1, transform: 'translate(0%, 0)', width: 'auto' } }
            exit={ { opacity: 0, transform: 'translate(-10%, 0)', height: 'auto' } }>
                { children }
    </motion.div>
    )
}

export default TransitionPages