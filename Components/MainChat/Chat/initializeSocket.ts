import { fromEvent, map, of, switchMap } from "rxjs"
import io from "socket.io-client"

export const initializeSocket = async(): Promise<void> => {

    fetch( '/api/sockets/messages' )
    const IO = io()

    const _io = of( IO )
    const connect = _io.pipe( 
        switchMap( 
            ( socket ) => fromEvent( socket, 'connect' )
            .pipe(
                map( v => v )
            )
         )
     ) 

    connect.subscribe( () => console.log( 'subbed to socket' ) )

    // IO.on( 'connect', () => {
    //     console.log( 'socket connected' )
    // } )
}
