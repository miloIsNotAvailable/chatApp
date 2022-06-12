import { FC, useEffect } from "react";
import { styles } from "../FriendListStyles";
import Link from "next/link";
import { useAppDispatch } from "../../../store/hooks";
import { getChannelUsername } from "../../../store/showChannelUsername";
import { useFriendListContext } from "../../../contexts/friendListContext";
import UnreadMgsNotification from "./UnreadMsgNotification";

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

    useEffect( () => {

        const store = localStorage.getItem( 'selected' )
        const parsed = store && JSON.parse( store )

        const value = parsed && parsed.sel
        setSelected( value )
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [] )

    return (
        <li 
            className={ styles.display_friend }
            style={ selected === redirectTo ?
                { backgroundColor: "var(--dark)" } : {} 
            } 
            key={ name }
            onClick={ () => { 
                setSelected( redirectTo ) 
                console.log( redirectTo )
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
            <UnreadMgsNotification redirectTo={ redirectTo } />
        </li>
    )
}

export default DisplayFriend