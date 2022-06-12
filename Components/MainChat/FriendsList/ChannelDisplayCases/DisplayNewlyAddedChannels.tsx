import { Channel } from "@prisma/client";
import { FC, useEffect, useState } from "react";
import { useAppSelector } from "../../../store/hooks";
import { ObservableType } from "../../../store/interfaces";
import DisplayChannels from "../DisplayChannels";
import { styles } from "../FriendListStyles";
import { fromEvent, map, mergeMap, of } from "rxjs";
import { _io } from "../../../constants/WebSocketsConstants";
import { useUserInfo } from "../../../constants/userConstants";
import { ChannelType } from "./DisplayExistingChannels";

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
            data?.users.find( ( n: string ) => n === name )
            && setNewChannel( data )
        } )

    } )

    useEffect( () => {
        console.log( newChannel )
        console.log( selector )
    }, [ newChannel, selector ] )

    if( !newChannel ) return (
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

    if( !newChannel && selector?.id ) return (
        <div className={ styles.display_friend_list }>
        <>
        {
           [...channels, selector]
           .map( ( { users, id } ) => (
                users && 
                <DisplayChannels
                    id={ id }
                    users={ users }
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
               newChannel && [...channels, newChannel]
                .map( ( { users, id, user }: ChannelType ) => (
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
}

export default DisplayNewChannels