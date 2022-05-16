import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getRegisterInfoState } from "./interfaces";

const initialState: getRegisterInfoState = {
    email: '',
    username: '',
    password: '',
}

const getRegisterInfoSlice = createSlice( {
    name: 'registerInfo', 
    initialState,
    reducers: {
        setUserData: ( 
            state: getRegisterInfoState, 
            action: PayloadAction<getRegisterInfoState> 
            ) => {
                state.email = action.payload.email
                state.username = action.payload.username
                state.password = action.payload.password
            }
        }   
    } 
)

export const { setUserData } = getRegisterInfoSlice.actions
export default getRegisterInfoSlice.reducer