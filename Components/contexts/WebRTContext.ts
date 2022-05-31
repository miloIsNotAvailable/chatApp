import { createContext } from "react";

export const RTCConnection = createContext<RTCPeerConnection | null>( null )
export const RTCConnectionContext = RTCConnection.Provider
