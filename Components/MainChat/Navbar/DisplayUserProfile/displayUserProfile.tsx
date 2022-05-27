import { FC, useContext } from "react";
import { SessionRerouteContext } from "../../../contexts/context";
import { getChannelUsernameState } from "../../../interfaces/mainchatInterfaces";
import { useAppSelector } from "../../../store/hooks";
import { ChannelUsername } from "../../../store/interfaces";
import { styles } from "../Build/NavbarStyles";

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
            <div className={ styles.align_username }>
                { selector }
            </div>
        </div>
    )
}

export default DisplayUser