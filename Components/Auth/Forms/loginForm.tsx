import { FC, MutableRefObject, useRef } from "react";
import style from '../../../styles/Login.module.css'
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
            type={ title }
            onChange={ handleChange }/>
        </div>
    )
}

export default LoginForm