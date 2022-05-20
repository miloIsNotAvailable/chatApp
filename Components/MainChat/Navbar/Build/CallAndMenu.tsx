import { FC } from "react";
import Call from "../Calls/Call";
import Menu from "../menu/Menu";
import { styles } from "./NavbarStyles";

const CallAndMenu: FC = () => {

    return (
        <div className={ styles.call_and_menu }>
            <Call/>
            <Menu/>
        </div>
    )
}

export default CallAndMenu