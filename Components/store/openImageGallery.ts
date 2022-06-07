import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { galleryIsOpenType } from "./interfaces";

const initialState: galleryIsOpenType = {
    open: false,
}

const galleryIsOpenSlice = createSlice( {
    name: 'isOpen', 
    initialState,
    reducers: {
        isOpen: ( 
            state: galleryIsOpenType, 
            action: PayloadAction<galleryIsOpenType> 
            ) => {
                state.open = action.payload.open
            }
        }   
    } 
)

export const { isOpen } = galleryIsOpenSlice.actions
export default galleryIsOpenSlice.reducer