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
import { clientSide } from "../../constants/clientSide";

type State = { newChannel: ObservableType }

const FriendList: FC = () => {

    const sessionContext = useContext( SessionRerouteContext )

    const arr: Channel[] | null = sessionContext?.channels || null
    const[ selected, setSelected ] = useState<string | null>(  arr ? arr[0]?.id : null )
    // const { channels } = useFetch<Channel[]>( '/api/get_channels', sessionContext ) || { channels: null }
    const { channels, channelID } = useUserInfo()

    const selector = useAppSelector( ( state: State ) => state?.newChannel || [] )

    const roomObservable = of( selected )

    useEffect( () => {
        localStorage.setItem( 'selected', JSON.stringify( { sel: channelID } ) )
    }, [ channelID ] )

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
        console.log( channels )
        
        const find = channels.find( ( v: any ) => v.id === selected )
        dispatch( getChannelUsername( { name: find?.user[0]?.name } ) )

    }, [ channels, dispatch, currentUsername ])

    if( !channels ) return <ChannelsLoading/>

    if( channels.length === 0 && !selector?.users ) return <ChannelsNotFound/>

    // if( selector?.users ) return (
    //     <FriendListContext value={ { selected, setSelected } }>
    //         <>
    //             <DisplayNewChannels
    //                 channels={ channels }
    //             />
    //         </>
    //     </FriendListContext>
    // ) 

    return (
        <FriendListContext value={ { selected, setSelected } }>
            <>
            <DisplayExistingChannels 
                channels={ channels }/>
            </>
        </FriendListContext>
    )
}

export default FriendList