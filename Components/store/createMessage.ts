import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MessageType } from "./interfaces";

const initialState: MessageType = {
    channelID: '',
    content: ""
}

const newMessageSlice = createSlice( {
    name: 'newMessage', 
    initialState,
    reducers: {
        newMessage: ( 
            state: MessageType, 
            action: PayloadAction<MessageType> 
            ) => {
                state.channelID = action.payload.channelID
                state.content = action.payload.content
            }
        }   
    } 
)

export const { newMessage } = newMessageSlice.actions
export default newMessageSlice.reducer