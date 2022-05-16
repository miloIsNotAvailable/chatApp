import { configureStore } from "@reduxjs/toolkit";
import getRegisterInfo from "./getRegisterInfo";

export const store = configureStore( {
    reducer: {
        getRegisterInfo: getRegisterInfo
    }
} )

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch