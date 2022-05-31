import Image from "next/image";
import { FC } from "react";
import CallIcon from '../../../../graphics/call.svg' 
import { styles } from "../Build/NavbarStyles";
import VoiceCall from "./VoiceCall";

const Call: FC = () => {

    return (
        <div className={ styles.wrap_call } tabIndex={ 0 }>
            <div>
                <Image 
                className={ styles.call_icon } 
                src={ CallIcon }
                alt=""
                layout="fixed"/>
            </div>
            <div className={ styles.call_options }>
                <VoiceCall/>
            </div>
        </div>
    )
}

export default Call