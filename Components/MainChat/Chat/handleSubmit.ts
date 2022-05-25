import { FormEvent, MutableRefObject } from "react"
import { Socket } from "socket.io-client"
import { DefaultEventsMap } from "socket.io/dist/typed-events"
import { MessageType } from "../../store/interfaces";

// I ain't think that simplifies anythying

export const Submit: (
    e: FormEvent<HTMLFormElement> | MouseEvent,
    inputRef: MutableRefObject<HTMLInputElement | null>,
    dispatch: any,
    socket: Socket<DefaultEventsMap, DefaultEventsMap>,
    newMessage: (payload: MessageType) => {
        payload: MessageType;
        type: string;
    }
) => void 
= ( 
    e, 
    inputRef, 
    dispatch, 
    socket,
    newMessage
): void => {
    if( !inputRef.current?.value?.trim() ) return
    e.preventDefault()
    
    socket.emit( 'message', inputRef.current?.value?.trim() )

    dispatch( newMessage( { message: inputRef.current?.value?.trim() } ) )
    if( inputRef.current ) inputRef.current.value = ''
}