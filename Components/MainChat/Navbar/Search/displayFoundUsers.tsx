import { FC } from "react";
import { styles } from "../Build/NavbarStyles";
import { motion } from "framer-motion";

interface DisplayFoundUsersProps {
    name: string
    ind: number
    handleClick: () => void
}

const DisplayFoundUser: FC<DisplayFoundUsersProps> 
= ( { name, ind, handleClick } ) => {

    return(
        <motion.div
        key={ name } 
        className={ styles.show_user }
        onClick={ handleClick }
        transition={{ 
            duration: .1, 
            type: "spring", 
            stiffness: 500 }}
        initial={ { height: 0 } }
        animate={ { height: '5vw' } }
        exit={ { height: 0, opacity: 0 } }>
            <div className={ styles.user_profile }/>
            { name }
        </motion.div>
    )
}

export default DisplayFoundUser