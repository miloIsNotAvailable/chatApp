import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChannelUsername, getRegisterInfoState, isFetchingState } from "./interfaces";

const initialState: ChannelUsername = {
    name: null
}

const getChannelusernameSlice = createSlice( {
    name: 'channelUsername', 
    initialState,
    reducers: {
        getChannelUsername: ( 
            state: ChannelUsername, 
            action: PayloadAction<ChannelUsername> 
            ) => {
                state.name = action.payload.name
            }
        }   
    } 
)

export const { getChannelUsername } = getChannelusernameSlice.actions
export default getChannelusernameSlice.reducer