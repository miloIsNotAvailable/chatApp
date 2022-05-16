import { FC, MutableRefObject, useRef } from "react";
import style from '../../../styles/Login.module.css'
import { setUserData } from "../../store/getRegisterInfo";
import { useAppDispatch } from "../../store/hooks";
import { LoginFormType } from "../../interfaces/formInterfaces";

interface loginFormProps {
    title: string
}

const LoginForm: FC<loginFormProps & LoginFormType> 
= ( { 
    title, 
    loginFormRef,
    handleChange
} ) => {
    
    return(
        <div className={ style.input_form_wrap }>
            <div> { title } </div>
            <input 
            ref={ loginFormRef }
            className={ style.input }
            placeholder={ title }
            onChange={ handleChange }/>
        </div>
    )
}

export default LoginForm