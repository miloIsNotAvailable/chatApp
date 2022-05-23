import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MessageType } from "./interfaces";

const initialState: MessageType = {
    message: null
}

const newMessageSlice = createSlice( {
    name: 'newMessage', 
    initialState,
    reducers: {
        newMessage: ( 
            state: MessageType, 
            action: PayloadAction<MessageType> 
            ) => {
                state.message = action.payload.message
            }
        }   
    } 
)

export const { newMessage } = newMessageSlice.actions
export default newMessageSlice.reducer