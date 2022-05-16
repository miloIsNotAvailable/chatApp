import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getRegisterInfoState } from "./interfaces";

const initialState: getRegisterInfoState = {
    email: '',
    username: ''
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
            }
    }   
} )

export const { setUserData } = getRegisterInfoSlice.actions
export default getRegisterInfoSlice.reducer