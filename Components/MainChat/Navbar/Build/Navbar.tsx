import { FC } from "react";
import DisplayUser from "../DisplayUserProfile/displayUserProfile";
import { styles } from "./NavbarStyles";
import Search from "../Search/Search";

const Navbar: FC = () => {

    return (
        <div className={ styles.navbar_display }>
            <Search/>
            <DisplayUser/>
        </div>
    )
}

export default Navbar