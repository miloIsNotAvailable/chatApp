import { fromEvent, map, mergeMap, Observable } from "rxjs"
import { _io } from "../../../constants/WebSocketsConstants"
import { IOObservable, SocketType } from "../../../interfaces/WebSocketsTypes"

export const listenToMessages: 
( handle: (v: IOObservable<SocketType>) => void ) => void
= ( handle ): void => {
    const m: Observable<IOObservable<SocketType>> = _io.pipe( 
        mergeMap( ( client ) => 
          fromEvent( client, 'new-pm' ).pipe(
            map(
              ( data ) => data
            )
          )
         ) 
      )
      m.subscribe( handle )
}