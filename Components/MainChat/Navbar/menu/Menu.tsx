import { FC } from "react";
import { styles } from "../Build/NavbarStyles";

const Menu: FC = () => {

    return (
        <div className={ styles.menu_icon }>
            <svg id="more" width="50" height="27" viewBox="0 0 50 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g>
                    <ellipse id="Ellipse 2" cx="4.44189" cy="13.5" rx="4.3335" ry="4.5" fill="white"/>
                    <ellipse id="Ellipse3" cx="24.6646" cy="13.5" rx="4.3335" ry="4.5" fill="white"/>
                    <ellipse id="Ellipse 4" cx="44.8882" cy="13.5" rx="4.3335" ry="4.5" fill="white"/>
                </g>
            </svg>
        </div>
    )
}

export default Menu