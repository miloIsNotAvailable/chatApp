import { Channel } from "@prisma/client";
import { FC, useContext, useEffect, useMemo, useState } from "react";
import { fromEvent, map, mergeMap, of } from "rxjs";
import { _io } from "../../constants/WebSocketsConstants";
import { SessionRerouteContext } from "../../contexts/context";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getChannelUsername } from "../../store/showChannelUsername";
import { displayFriendName } from "./displayFriendName";
import { useFetch } from "./FetchChannels";
import { joinRoomOnClick } from "./joinRoomOnClick";
import { ObservableType } from "../../store/interfaces";
import DisplayExistingChannels from "./ChannelDisplayCases/DisplayExistingChannels";
import { useFriendListContext } from "../../contexts/friendListContext";
import DisplayNewChannels from "./ChannelDisplayCases/DisplayNewlyAddedChannels";
import ChannelsNotFound from "./ChannelDisplayCases/ChannelsNotFound";
import ChannelsLoading from "./ChannelDisplayCases/LoadingChannels";
import { useUserInfo } from "../../constants/userConstants";

type State = { newChannel: ObservableType }

const FriendList: FC = () => {

    const sessionContext = useContext( SessionRerouteContext )

    const arr: Channel[] | null = sessionContext?.channels || null
    const[ selected, setSelected ] = useState<string | null>( arr ? arr[0]?.id : null )
    // const { channels } = useFetch<Channel[]>( '/api/get_channels', sessionContext ) || { channels: null }
    const { channels } = useUserInfo()


    const selector = useAppSelector( ( state: State ) => state?.newChannel || [] )

    const roomObservable = of( selected )

    // join the room on click
    useEffect( () => {

        joinRoomOnClick( roomObservable )
    }, [ roomObservable ] )

    const currentUsername = sessionContext?.user?.name
    const dispatch = useAppDispatch()
    const { FriendListContext } = useFriendListContext()

    /**
     * whenever the array of users loads and user 
     * is in any channels then
     * set the selected channel to the first user
     * and update the name of selected user 
     * in the navbar 
     */
    
    useEffect( () => {
        if( !channels || channels.length === 0 ) return
        
        setSelected( channels[0]?.id )
        const name = displayFriendName( channels[0].users, currentUsername ) 
        dispatch( getChannelUsername( { name } ) )

    }, [ channels, dispatch, currentUsername ])

    if( !channels ) return <ChannelsLoading/>

    if( channels.length === 0 ) return <ChannelsNotFound/>

    if( selector?.users ) return (
        <FriendListContext value={ { selected, setSelected } }>
            <DisplayNewChannels
                channels={ channels }
            />
        </FriendListContext>
    ) 

    return (
        <FriendListContext value={ { selected, setSelected } }>
            <DisplayExistingChannels 
                channels={ channels }/>
        </FriendListContext>
    )
}

export default FriendList