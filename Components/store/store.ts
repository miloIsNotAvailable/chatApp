import { combineReducers, configureStore } from "@reduxjs/toolkit";
import getRegisterInfo from "./getRegisterInfo";

import getPassword from "./getPassword";
import getEmail from "./getEmail";
import getUsername from "./getUsername";
import checkForFetching from "./isFetching";
import createChannel from './createChannel'
import createNewMessage from './createMessage'
import channelUsername from './showChannelUsername'
import newRTCPeerConnection from './createRTCPeer'
import URLDataToLink from './getURLDataAsLink'
import galleryOpen from './openImageGallery'

export const store = configureStore( {
    reducer: {
        getRegisterInfo: getRegisterInfo,
        formReducer: combineReducers( { 
            getEmail, 
            getPassword, 
            getUsername 
        } ),
        fetching: checkForFetching,
        newChannel: createChannel,
        createMessage: createNewMessage,
        channelUsername: channelUsername,
        RTCPeerConnection: newRTCPeerConnection,
        URLDataToLink: URLDataToLink,
        galleryOpen: galleryOpen
    }
} )

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch