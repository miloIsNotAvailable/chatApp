export type callUserTypes = {
    name: string | undefined
    channelID: string
}
export type callType = callUserTypes & RTCSessionDescriptionInit
export type setCallType = callType | null