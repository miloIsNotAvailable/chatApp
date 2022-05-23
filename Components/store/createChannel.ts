import { User } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Observable, of } from "rxjs";
import { ObservableType, U } from "./interfaces";

type StateObservable = {
    observer: Observable<ObservableType>
}

const initialState: ObservableType = {
    users: null, 
    id: null 
}

const createChannelSlice = createSlice( {
    name: 'createChannel', 
    initialState,
    reducers: {
        createChannelFromData: ( 
            state: ObservableType, 
            action: PayloadAction<ObservableType> 
            ) => {
                state.id = action.payload.id
                state.users = action.payload.users
            }
        }   
    } 
)

export const { createChannelFromData } = createChannelSlice.actions
export default createChannelSlice.reducer