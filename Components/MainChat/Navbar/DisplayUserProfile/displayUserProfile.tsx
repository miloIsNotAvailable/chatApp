import { FC, useContext } from "react";
import { SessionRerouteContext } from "../../../contexts/context";
import { useAppSelector } from "../../../store/hooks";
import { ChannelUsername } from "../../../store/interfaces";
import { styles } from "../Build/NavbarStyles";

type getChannelUsernameState = {
    channelUsername: ChannelUsername
}

const DisplayUser: FC = () => {

    const getRerouteData = useContext( SessionRerouteContext ) 
    const selector = useAppSelector( 
        ( 
            { channelUsername }: getChannelUsernameState 
        ) => channelUsername?.name 
    )

    return (
        <div className={  styles.display_user }>
            <div className={ styles.user_profile }>
                
            </div>
            { selector }
        </div>
    )
}

export default DisplayUser