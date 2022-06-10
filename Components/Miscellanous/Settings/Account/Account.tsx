import { useRouter } from "next/router";
import { FC, useContext } from "react";
import { SessionRerouteContext } from "../../../contexts/context";
import { styles } from "../../MicStyles";

const Account: FC = () => {

    const context = useContext( SessionRerouteContext )

    const router = useRouter()

    const handleLogOut = () => {
        fetch( "/api/logout", {
            method: "POST", 
            body: JSON.stringify( context?.jwt )
        } ).then( () => router.push( "/" ) )
    }

    return (
        <div className={ styles.logout_wrap }>
            <div>sign out</div> 
            <div 
                className={ styles.logout_button }
                onClick={ handleLogOut }>
                sign out
            </div>
        </div>
    )
}

export default Account