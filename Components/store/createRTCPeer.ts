import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MessageType, RTCPeerType } from "./interfaces";

const initialState: RTCPeerType = {
    peer: null
}

const newRTCPeerConnectionSlice = createSlice( {
    name: 'newPeer', 
    initialState,
    reducers: {
        newRTCPeerConnection: ( 
            state: RTCPeerType, 
            action: PayloadAction<RTCPeerType> 
            ) => {
                state.peer = action.payload.peer
            }
        }   
    } 
)

export const { newRTCPeerConnection } = newRTCPeerConnectionSlice.actions
export default newRTCPeerConnectionSlice.reducer