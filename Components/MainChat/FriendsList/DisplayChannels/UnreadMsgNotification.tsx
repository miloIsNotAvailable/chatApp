import { FC } from "react";
import { readMsgs } from "../../../interfaces/mainchatInterfaces";
import { useAppSelector } from "../../../store/hooks";
import { unreadType } from "../../../store/interfaces";
import { styles } from "../FriendListStyles";

interface UnreadMgsNotificationProps {
    redirectTo: string | null
}

const UnreadMgsNotification: FC<UnreadMgsNotificationProps> 
= ( { redirectTo } ) => {

    const selector = useAppSelector( 
        ( state: readMsgs ) => state.checkForReadMessages
    )

    if( !selector.unread ) return ( <></> )

    return (
        <>
            {
                selector.channelID === redirectTo
                && 
                <div className={ styles.unread } >
                    { selector.unreadMsgs }
                </div> 
            }
        </>
    )
}

export default UnreadMgsNotification