import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getRegisterInfoState } from "./interfaces";

const initialState: getRegisterInfoState = {
    username: null,
}

const getUsernameInfoSlice = createSlice( {
    name: 'usernameInfo', 
    initialState,
    reducers: {
        setUserUsername: ( 
            state: getRegisterInfoState, 
            action: PayloadAction<getRegisterInfoState> 
            ) => {
                state.username = action.payload.username
            }
        }   
    } 
)

export const { setUserUsername } = getUsernameInfoSlice.actions
export default getUsernameInfoSlice.reducer