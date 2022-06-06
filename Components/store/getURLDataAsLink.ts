import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getRegisterInfoState, URLDataToLink } from "./interfaces";

const initialState: URLDataToLink = {
    URLData: null,
    filename: null
}

const getURLDataSlice = createSlice( {
    name: 'URLDataToLink', 
    initialState,
    reducers: {
        setURLData: ( 
            state: URLDataToLink, 
            action: PayloadAction<URLDataToLink> 
            ) => {
                state.URLData = action.payload.URLData
                state.filename = action.payload.filename
            }
        }   
    } 
)

export const { setURLData } = getURLDataSlice.actions
export default getURLDataSlice.reducer