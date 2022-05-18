import { FC } from "react";

import { 
    LoginEmail, 
    LoginPassword, 
    LoginUsername 
} from '../Forms'

import AnimatedString from "./AnimatedString";
import Proceed from "./proceedButton";

import { styles } from "./registerStyles";

const BuildRegister: FC = () => {

    return(
        <div className={ styles.register_form_wrap }>
            <div className={ styles.register_form }>
                <LoginEmail />
                <LoginPassword />
                <LoginUsername />
            </div>
            <div className={ styles.register_bg }>
                <div className={ styles.step }>1/3</div>
                <AnimatedString/>
                <Proceed />
            </div>
        </div>
    )
}

export default BuildRegister