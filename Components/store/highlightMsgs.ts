import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { highlightMsgs } from "./interfaces";

const initialState: highlightMsgs = {
    open: false,
}

const highglightUserMsgsSlice = createSlice( {
    name: 'highlight', 
    initialState,
    reducers: {
        highlightedUserMsgs: ( 
            state: highlightMsgs, 
            action: PayloadAction<highlightMsgs> 
            ) => {
                state.open = action.payload.open
            }
        }   
    } 
)

export const { highlightedUserMsgs } = highglightUserMsgsSlice.actions
export default highglightUserMsgsSlice.reducer