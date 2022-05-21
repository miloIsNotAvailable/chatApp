import { FC, useContext } from "react";
import { SessionRerouteContext } from "../../../contexts/context";
import { styles } from "../Build/NavbarStyles";

const DisplayUser: FC = () => {

    const getRerouteData = useContext( SessionRerouteContext ) 

    return (
        <div className={  styles.display_user }>
            <div className={ styles.user_profile }>
                
            </div>
            { getRerouteData?.id }
        </div>
    )
}

export default DisplayUser