import { Observable } from "rxjs"
import { Socket } from "socket.io-client"
import { DefaultEventsMap } from "socket.io/dist/typed-events"

export type SocketType = Socket<DefaultEventsMap, DefaultEventsMap>
export type IOObservable<T> = Observable<T>
