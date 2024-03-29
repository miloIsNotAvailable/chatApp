
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
    users: string[] | null
    id: string | null,
    user: any
}

export type MessageType = {
    channelID: string
    content: string
    from: string
    messageID: string
}

export type ChannelUsername = {
    name: string | null
}

export type RTCPeerType = {
    peer: string | null
}

export type RTCPeerState = {
    RTCPeerConnection: RTCPeerType
}

export type URLDataToLink = {
    URLData: FileReader['result'] | undefined
    filename: string | null
}

export type galleryIsOpenType = {
    open: boolean
}

export type highlightMsgs = {
    open: boolean
}

export type unreadType = {
    unread: boolean
    channelID: string | null
    unreadMsgs: string | number;
}

export type getLoginErrorsType = {
    error: string | undefined
}