import { fromEvent, map, mergeMap, of } from "rxjs";
import { _io } from "../../../../constants/WebSocketsConstants";

export const listenToFetch = ( handle: ( v: any ) => void ) => 
_io.pipe(
    mergeMap( 
        client => fromEvent( client, 'get-more-msgs' )
        .pipe(
            map( data => data )
        )
     )
).subscribe( handle )
