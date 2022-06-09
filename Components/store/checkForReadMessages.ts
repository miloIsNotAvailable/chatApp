import { User } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Observable, of } from "rxjs";
import { unreadType, U } from "./interfaces";

const initialState: unreadType = {
    unread: true,
    channelID: null
}

const checkForUnreadMessages = createSlice( {
    name: 'unreadMsgs', 
    initialState,
    reducers: {
        messageIsUnread: ( 
            state: unreadType, 
            action: PayloadAction<unreadType> 
            ) => {
                state.unread = action.payload.unread
                state.channelID = action.payload.channelID
            }
        }   
    } 
)

export const { messageIsUnread } = checkForUnreadMessages.actions
export default checkForUnreadMessages.reducer