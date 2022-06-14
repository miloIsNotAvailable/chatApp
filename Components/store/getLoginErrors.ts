import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getLoginErrorsType } from "./interfaces";

const initialState: getLoginErrorsType = {
    error: undefined
}

const getLoginErrorSlice = createSlice( {
    name: 'loginErrors', 
    initialState,
    reducers: {
        setLoginError: ( 
            state: getLoginErrorsType, 
            action: PayloadAction<getLoginErrorsType> 
            ) => {
                state.error = action.payload.error
            }
        }   
    } 
)

export const { setLoginError } = getLoginErrorSlice.actions
export default getLoginErrorSlice.reducer