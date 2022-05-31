import Image from "next/image";
import { FC } from "react";
import MicIcon from '../../../../graphics/mic.svg' 
import { useUserInfo } from "../../../constants/userConstants";
import { styles } from "../Build/NavbarStyles";
import { callUser } from "./createConnection";

const VoiceCall: FC = () => {

    const { name, channelID } = useUserInfo()

    return (
        <div>
            <Image 
            className={ styles.voice_call_icon } 
            src={ MicIcon }
            alt=""
            onClick={ () => callUser( { name, channelID } ) }/>
        </div>
    )
}

export default VoiceCall