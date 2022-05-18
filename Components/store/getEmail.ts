import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getRegisterInfoState } from "./interfaces";

const initialState: getRegisterInfoState = {
    email: null,
}

const getEmailInfoSlice = createSlice( {
    name: 'emailInfo', 
    initialState,
    reducers: {
        setUserEmail: ( 
            state: getRegisterInfoState, 
            action: PayloadAction<getRegisterInfoState> 
            ) => {
                state.email = action.payload.email
            }
        }   
    } 
)

export const { setUserEmail } = getEmailInfoSlice.actions
export default getEmailInfoSlice.reducer