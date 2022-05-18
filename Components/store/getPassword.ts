import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getRegisterInfoState } from "./interfaces";

const initialState: getRegisterInfoState = {
    password: null,
}

const getPasswordSlice = createSlice( {
    name: 'passwordInfo', 
    initialState,
    reducers: {
        setUserPassword: ( 
            state: getRegisterInfoState, 
            action: PayloadAction<getRegisterInfoState> 
            ) => {
                state.password = action.payload.password
            }
        }   
    } 
)

export const { setUserPassword } = getPasswordSlice.actions
export default getPasswordSlice.reducer