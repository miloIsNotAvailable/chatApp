import { FC } from "react";
import DisplayUser from "../DisplayUserProfile/displayUserProfile";
import { styles } from "./NavbarStyles";
import Search from "../Search/Search";
import CallAndMenu from "./CallAndMenu";

const Navbar: FC = () => {

    return (
        <div className={ styles.navbar_display }>
            <Search/>
            <div className={ styles.display_right }>
                <DisplayUser/>
                <CallAndMenu/>
            </div>
        </div>
    )
}

export default Navbar