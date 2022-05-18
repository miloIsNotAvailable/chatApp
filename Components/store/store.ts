import { combineReducers, configureStore } from "@reduxjs/toolkit";
import getRegisterInfo from "./getRegisterInfo";

import getPassword from "./getPassword";
import getEmail from "./getEmail";
import getUsername from "./getUsername";

export const store = configureStore( {
    reducer: {
        getRegisterInfo: getRegisterInfo,
        formReducer: combineReducers( { 
            getEmail, 
            getPassword, 
            getUsername 
        } )
    }
} )

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch