import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit"
import { map, mergeMap, of, switchMap } from "rxjs"
import { fromFetch } from "rxjs/fetch"
import { useUserInfo } from "../../../constants/userConstants"
import { _io } from "../../../constants/WebSocketsConstants"
import { createChannelFromData } from "../../../store/createChannel"
import { useAppDispatch } from "../../../store/hooks"
import { U } from "../../../store/interfaces"

interface CreateChannelProps {
    name: ( string | undefined )[], 
    id: ( string | undefined )[], 
    // Dispatch: ThunkDispatch<any, undefined, AnyAction>
}

export const useCreateChannel = () => {

    const dispatch = useAppDispatch() 
    const user = useUserInfo()

    return ( { name, id }: CreateChannelProps ) => _io.pipe( 
        mergeMap( 
            socket => of( { socket, data: { name, id } } )
            .pipe( map( data => data )  ) 
        ) 
     ).subscribe( ( { socket, data } ) => {

        const { name, id } = data
        const _id = id.map( id => ({ id }) )
        console.log( _id, id )

        dispatch( 
            createChannelFromData( { users: [ user?.name ? user.name : 'one', 'loading' ], id: 'loading', user: [{name: 'loading'}] } ) 
        )    

        socket.emit( 'new-channel', { name, id: _id } )
    } )
}
