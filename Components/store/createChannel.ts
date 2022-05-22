import { User } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { U } from "./interfaces";

const initialState: User | U = {
    name: null,
    id: null
}

const createChannelSlice = createSlice( {
    name: 'createChannel', 
    initialState,
    reducers: {
        createChannelFromData: ( 
            state: U, 
            action: PayloadAction<U> 
            ) => {
                state.name = action.payload.name
                state.id = action.payload.id
            }
        }   
    } 
)

export const { createChannelFromData } = createChannelSlice.actions
export default createChannelSlice.reducer