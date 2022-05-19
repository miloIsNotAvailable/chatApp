import Image from "next/image";
import { FC } from "react";
import CallIcon from '../../../../graphics/call.svg' 
import { styles } from "../Build/NavbarStyles";

const Call: FC = () => {

    return (
        <div>
            <Image 
            className={ styles.call_icon } 
            src={ CallIcon }
            alt=""/>
        </div>
    )
}

export default Call