import { Channel } from "@prisma/client";
import { FC, useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../../store/hooks";
import { ObservableType } from "../../../store/interfaces";
import DisplayChannels from "../DisplayChannels";
import { styles } from "../FriendListStyles";
import { fromEvent, map, mergeMap, of } from "rxjs";
import { _io } from "../../../constants/WebSocketsConstants";
import { useUserInfo } from "../../../constants/userConstants";
import { ChannelType } from "./DisplayExistingChannels";
import { getChannelUsername } from "../../../store/showChannelUsername";
import { displayFriendName } from "../displayFriendName";

interface DisplayNewChannelsProps {
    channels: Channel[]
}

type State = { newChannel: ObservableType }

const DisplayNewChannels: FC<DisplayNewChannelsProps> 
= ( { channels } ) => {

    const selector = useAppSelector( ( state: State ) => state?.newChannel || [] )
    useEffect( () => console.log( selector ), [ selector ] )

    const { name } = useUserInfo()
    const [ newChannel, setNewChannel ] = useState<Channel | null>( null )

    const newChannelRef = useRef<any>( null )

    useEffect( () => {
        // selector?.users && console.log( selector )
        _io.pipe(
            mergeMap(
                client => fromEvent( client, 'created-channel' )
                .pipe(
                    map(
                       data => data 
                    )
                )
            )
        ).subscribe( data => {
            console.log( data )
            newChannelRef.current = {...data, user: [ { name: displayFriendName( data?.users, name ) } ]}
            if(data?.users.find( ( n: string ) => n === name )) {

                setNewChannel( data )
            }
        } )

    } )

    useEffect( () => {
        console.log( newChannelRef.current )
        console.log( selector )
    }, [ newChannel, selector ] )

    if( !newChannelRef.current ) return (
        <div className={ styles.display_friend_list }>
        <>
        {
           channels && 
           channels.map( ( { users, id, user }: ChannelType ) => (
                users && 
                <DisplayChannels
                    id={ id }
                    users={ user && user[0]?.name }
                    key={ id }
                />
            ) )
        }
        </>
    </div>
    )

    if( !newChannelRef.current && selector?.id ) return (
        <div className={ styles.display_friend_list }>
        <>
        {
           [...channels, selector]
           .map( ( { users, id, user }: any ) => (
                users && 
                <DisplayChannels
                    id={ id }
                    users={ user[0]?.name }
                    key={ id }
                />
            ) )
        }
        </>
    </div>
    )

    return (
        <div className={ styles.display_friend_list }>
            <>
            {
               newChannelRef.current && [...channels, newChannelRef.current]
                .map( ( { users, id, user }: ChannelType ) => (
                    users && 
                    <DisplayChannels
                        id={ id }
                        users={ user && user[0]?.name }
                        key={ id }
                    />
                ) ) || <div>error</div>
            }
            </>
        </div>
    )
}

export default DisplayNewChannels