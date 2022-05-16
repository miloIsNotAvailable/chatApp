import { ChangeEvent, RefObject } from "react";
import { getRegisterInfoState } from "../store/interfaces";

export interface LoginFormType {

    loginFormRef: RefObject<HTMLInputElement>
    handleChange: ( ev: ChangeEvent<HTMLInputElement> ) => any
}

export interface getRegisterInfoSelector {
    getRegisterInfo: getRegisterInfoState
}
