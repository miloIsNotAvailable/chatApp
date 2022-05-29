import { FC, useState, CSSProperties } from "react";
import { styles } from "../FriendListStyles";
import { motion } from 'framer-motion'
import Link from "next/link";
import { useAppDispatch } from "../../../store/hooks";
import { getChannelUsername } from "../../../store/showChannelUsername";
import { useFriendListContext } from "../../../contexts/friendListContext";

interface DisplayFriendProps {
    name: string | any
    cssStyles: any
    redirectTo: string | null
    handleClick: ( name: any ) => any
}

const DisplayFriend: FC<DisplayFriendProps> 
= ( { 
    name, 
    redirectTo,
} ) => {

    const dispatch = useAppDispatch()
    const { selected, setSelected } = useFriendListContext()

    return (
        <motion.li 
            className={ styles.display_friend }
            style={ selected === redirectTo ?
                { backgroundColor: "var(--dark)" } 
                : 
                { backgroundColor: 'var(--bg)' } }
            key={ name }
            onTap={ () => { 
                setSelected( redirectTo ) 
                dispatch( getChannelUsername( { name } ) )
            } }>
            <div className={ styles.friend_icon }/>
            <div className={ styles.friend_name }>
                <Link
                href={ {
                    pathname: '/home/[id]',
                    query: { id: redirectTo ? redirectTo : '/' }
                } } >
                    { name }
                </Link>
            </div>
        </motion.li>
    )
}

export default DisplayFriend