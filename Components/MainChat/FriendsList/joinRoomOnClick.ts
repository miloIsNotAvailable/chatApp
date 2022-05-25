import { map, mergeMap, of, Observable } from "rxjs"
import { _io } from "../../constants/WebSocketsConstants"
import { SocketType } from "../../interfaces/WebSocketsTypes";

type ObservableType = {
    socket: SocketType;
    data: any;
}

export const joinRoomOnClick: 
(
    currentRoomID: Observable<any>
) => void 
= ( currentRoomID ) => {

    const m: Observable<ObservableType> = _io.pipe( 
        mergeMap( 
            socket => currentRoomID.pipe(
                map( data => ( { socket, data } ) )
            ) 
        )
    )
    
    m.subscribe( ( { data, socket } ) => {
        console.log( data )
        socket.emit( 'join-room', data )
    } )
}
