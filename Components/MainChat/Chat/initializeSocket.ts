import io from "socket.io-client"

export const initializeSocket = async(): Promise<void> => {

    fetch( '/api/sockets/messages' )
    const IO = io()

    IO.on( 'connect', () => {
        console.log( 'socket connected' )
    } )
}
