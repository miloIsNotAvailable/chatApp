import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getRegisterInfoState, isFetchingState } from "./interfaces";

const initialState: isFetchingState = {
    isFetching: false,
}

const isFetchingSlice = createSlice( {
    name: 'isFetching', 
    initialState,
    reducers: {
        isFetching: ( 
            state: isFetchingState, 
            action: PayloadAction<isFetchingState> 
            ) => {
                state.isFetching = action.payload.isFetching
            }
        }   
    } 
)

export const { isFetching } = isFetchingSlice.actions
export default isFetchingSlice.reducer