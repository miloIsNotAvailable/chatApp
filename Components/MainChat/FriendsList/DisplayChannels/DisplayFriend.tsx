import { FC, useState, CSSProperties } from "react";
import { styles } from "../FriendListStyles";
import { motion } from 'framer-motion'
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getChannelUsername } from "../../../store/showChannelUsername";
import { useFriendListContext } from "../../../contexts/friendListContext";
import { unreadType } from "../../../store/interfaces";
import { useUserInfo } from "../../../constants/userConstants";

interface DisplayFriendProps {
    name: string | any
    cssStyles: any
    redirectTo: string | null
    handleClick: ( name: any ) => any
}

type readMsgs = { checkForReadMessages: unreadType }

const DisplayFriend: FC<DisplayFriendProps> 
= ( { 
    name, 
    redirectTo,
} ) => {

    const dispatch = useAppDispatch()
    const { selected, setSelected } = useFriendListContext()

    const { channelID } = useUserInfo()

    const selector = useAppSelector( 
        ( state: readMsgs ) => state.checkForReadMessages
    )

    return (
        <li 
            className={ styles.display_friend }
            style={ selected === redirectTo ?
                { backgroundColor: "var(--dark)" } : {} 
            } 
            key={ name }
            onClick={ () => { 
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
            { selector?.unread && selector.channelID === redirectTo && 
            <div className={ styles.unread } /> }
        </li>
    )
}

export default DisplayFriend