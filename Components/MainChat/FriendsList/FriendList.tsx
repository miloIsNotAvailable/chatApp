import { Channel } from "@prisma/client";
import { FC, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { map, of, switchMap } from "rxjs";
import { fromFetch } from 'rxjs/fetch'
import { _io } from "../../constants/WebSocketsConstants";
import { SessionRerouteContext } from "../../contexts/context";
import { useAppDispatch } from "../../store/hooks";
import { getChannelUsername } from "../../store/showChannelUsername";
import DisplayFriend from "./DisplayFriend";
import { displayFriendName } from "./displayFriendName";
import { getChannelQuery } from "./FetchChannels";
import { styles } from "./FriendListStyles";
import { joinRoomOnClick } from "./joinRoomOnClick";

const FriendList: FC = () => {

    const sessionContext = useContext( SessionRerouteContext )

    const arr: Channel[] | null = sessionContext?.channels || null
    const[ selected, setSelected ] = useState<string | null>( arr ? arr[0]?.id : null )
    const [ channels, setChannels ] = useState<Channel[] | null>( null )

    const roomObservable = of( selected )

    // join the room on click
    useEffect( () => {

        joinRoomOnClick( roomObservable )
    }, [ roomObservable, selected ] )

    const currentUsername = sessionContext?.user?.name
    const dispatch = useAppDispatch()

    /**
     * whenever the array of users loads in
     * set the selected channel to the first user
     * and update the name of selected user 
     * in the navbar 
     */

     const f = getChannelQuery( "/api/get_channels", sessionContext )
     const handle = () => {
         f.subscribe( async( { data, loading } ) => {
             if( loading ) return 
             const res = await data
             return setChannels( res )
         } )
     }
 
     const v = useMemo( handle, [  ] )
 
     useEffect( () => { v; console.log( channels ) } )

    useEffect( () => {
        if( !channels ) return
        setSelected( channels[0]?.id )
        const name = displayFriendName( channels[0].users, currentUsername ) 
        dispatch( getChannelUsername( { name } ) )  
    }, [ channels, dispatch, currentUsername ])

    return (
        <div className={ styles.display_friend_list }>
            {
                channels && channels.map( ( { users, id }: Channel ) => (
                    <DisplayFriend 
                        redirectTo={ id }
                        name={ displayFriendName( users, currentUsername ) }
                        key={ id } 
                        cssStyles={ 
                            selected === id &&
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