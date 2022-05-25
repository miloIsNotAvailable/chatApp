
export interface getRegisterInfoState {
    email?: string | null 
    username?: string | null
    password?: string | null
}

export interface isFetchingState {
    isFetching: boolean
}

export type U = {
    users: (string | null)[] | null
    id: string | null
}

export type ObservableType = {
    users: (string | null)[] | null
    id: string | null
}

export type MessageType = {
    room: string
    msg: string
}

export type ChannelUsername = {
    name: string | null
}