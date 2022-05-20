import { FC, useState, CSSProperties } from "react";
import { styles } from "./FriendListStyles";
import { motion } from 'framer-motion'

interface DisplayFriendProps {
    name: string
    cssStyles: any
    handleClick: ( name: string ) => any
}

const DisplayFriend: FC<DisplayFriendProps> 
= ( { 
    name, 
    cssStyles,
    handleClick 
} ) => {


    return (
        <motion.li 
            className={ styles.display_friend }
            style={ cssStyles }
            key={ name }
            onTap={ () => handleClick( name ) }>
            <div className={ styles.friend_icon }/>
            <div className={ styles.friend_name }>
                { name }
            </div>
        </motion.li>
    )
}

export default DisplayFriend