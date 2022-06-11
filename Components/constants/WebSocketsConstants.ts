import { fromEvent, map, of, switchMap } from "rxjs"
import { io } from "socket.io-client"
import { IOObservable, SocketType } from "../interfaces/WebSocketsTypes"

export const IO: SocketType = io( {
    reconnection: true,
    rejectUnauthorized: false
} )

export const _io: IOObservable<SocketType> = of( IO )
export const connect = _io.pipe( 
    switchMap( 
        ( socket: SocketType ) => fromEvent( socket, 'connect' )
        .pipe(
            map( 
                (client: SocketType ) => ( { io, client } ) 
            )
        )
     )
 ) 
 
