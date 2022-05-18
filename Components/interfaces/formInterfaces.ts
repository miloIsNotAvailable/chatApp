import { CombinedState } from "@reduxjs/toolkit";
import { ChangeEvent, RefObject } from "react";
import { getRegisterInfoState, isFetchingState } from "../store/interfaces";

export interface LoginFormType {

    loginFormRef: RefObject<HTMLInputElement>
    handleChange: ( ev: ChangeEvent<HTMLInputElement> ) => any
}

export interface getRegisterInfoSelector {
    getRegisterInfo: getRegisterInfoState
}

export type CombinedStateTypes = {
    getEmail: getRegisterInfoState; 
    getPassword: getRegisterInfoState;
    getUsername: getRegisterInfoState;
}

export type SelectorType = {
    formReducer: CombinedState<CombinedStateTypes>
}

export type fetchingType = {
    fetching: isFetchingState
}
