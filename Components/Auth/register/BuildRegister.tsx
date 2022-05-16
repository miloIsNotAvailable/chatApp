import { FC, useState } from "react";

import { 
    LoginEmail, 
    LoginPassword, 
    LoginUsername 
} from '../Forms'
import AnimatedString from "./AnimatedString";

import { styles } from "./registerStyles";

//npx prisma studio
//npx prisma generate
//npm run dev

const BuildRegister: FC = () => {

    return(
        <div className={ styles.register_form_wrap }>
            <div className={ styles.register_form }>
                <LoginEmail/>
                <LoginPassword/>
                <LoginUsername/>
            </div>
            <div className={ styles.register_bg }>
                <div className={ styles.step }>1/3</div>
                <AnimatedString/>
                <div className={ styles.proceed_button }>ready?</div>
            </div>
        </div>
    )
}

export default BuildRegister