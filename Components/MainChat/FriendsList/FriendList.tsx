import { Channel } from "@prisma/client";
import { FC, useCallback, useContext, useEffect, useState } from "react";
import { fromEvent, map, mapTo, mergeMap, of } from "rxjs";
import { io } from "socket.io-client";
import { _io } from "../../constants/WebSocketsConstants";
import { SessionRerouteContext } from "../../contexts/context";
import DisplayFriend from "./DisplayFriend";
import { styles } from "./FriendListStyles";

const FriendList: FC = () => {

    const sessionContext = useContext( SessionRerouteContext )

    const arr: Channel[] | null = sessionContext?.channels || null
    const[ selected, setSelected ] = useState<any | null>( arr ? arr[0]?.users[0] : null )

    const e = of( selected )
    const socket = io()

    useEffect( () => {

        const m = _io.pipe( 
            mergeMap( 
                socket => e. pipe(
                    map( data => ( { socket, data } ) )
                ) 
            )
        )

        m.subscribe( ( { data, socket } ) => {
            console.log( data )
            socket.emit( 'join-room', data )
        } )
        
        const v = _io.pipe( 
            mergeMap( 
                client => fromEvent( client, 'hey' )
                .pipe( 
                    map( data => data )
                 )
            )
         )
        
        v.subscribe( ( { room, payload }: any ) => room === selected && console.log( payload ) )

    }, [ e, selected ] )

    // // query data client-side
    // const queryData = () => {
    //     fetch( '/api/get_channels', {
    //         method: "POST",
    //         body: JSON.stringify( sessionContext )
    //     } )
    //     .then( v => v.json() )
    //     .then( v => console.log( v ) )
    // }

    // console.log( sessionContext?.channels )

    // // memoize queried data
    // const e = useCallback( queryData, [] )
    // useEffect( () => e )

    return (
        <div className={ styles.display_friend_list }>
            {
                arr && arr.map( ( { users, id }: Channel ) => (
                    <DisplayFriend 
                        redirectTo={ selected }
                        name={ users[0] }
                        key={ id } 
                        cssStyles={ 
                            selected === users[0] &&
                            { 
                                backgroundColor: "var(--dark)"
                            }
                         }
                        handleClick={ setSelected }/>
                ) )
            }
        </div>
    )
}

export default FriendList