import { connect } from "../../../constants/WebSocketsConstants"

export const initializeSocket = async(): Promise<void> => {

    fetch( '/api/sockets/messages' )
    connect.subscribe( () => console.log( 'subbed to socket' ) )

    // IO.on( 'connect', () => {
    //     console.log( 'socket connected' )
    // } )
}
