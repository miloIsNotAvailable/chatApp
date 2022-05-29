import { Channel } from "@prisma/client";
import { FC, useContext, useEffect, useMemo, useState } from "react";
import { fromEvent, map, mergeMap, of } from "rxjs";
import { _io } from "../../constants/WebSocketsConstants";
import { SessionRerouteContext } from "../../contexts/context";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getChannelUsername } from "../../store/showChannelUsername";
import DisplayFriend from "./DisplayFriend";
import { displayFriendName } from "./displayFriendName";
import { useFetch } from "./FetchChannels";
import { styles } from "./FriendListStyles";
import { joinRoomOnClick } from "./joinRoomOnClick";
import LoadingAnimation from '../../../graphics/Loading.svg'
import NotFound from '../../../graphics/NotFound.svg'
import Image from "next/image";
import { useUserInfo } from "../../constants/userConstants";
import { ObservableType } from "../../store/interfaces";

type State = { newChannel: ObservableType }

const FriendList: FC = () => {

    const sessionContext = useContext( SessionRerouteContext )

    const arr: Channel[] | null = sessionContext?.channels || null
    const[ selected, setSelected ] = useState<string | null>( arr ? arr[0]?.id : null )
    const { channels } = useFetch<Channel[]>( '/api/get_channels', sessionContext ) || { channels: null }
    
    const selector = useAppSelector( ( state: State ) => state?.newChannel || [] )
    useEffect( () => console.log( selector ), [ selector ] )

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
    
    useEffect( () => {
        if( !channels || channels.length === 0 ) return
        
        setSelected( channels[0]?.id )
        const name = displayFriendName( channels[0].users, currentUsername ) 
        dispatch( getChannelUsername( { name } ) )

    }, [ channels, dispatch, currentUsername ])

    if( !channels ) return (
        <div className={ styles.display_friend_list }>
            <div className={ styles.loading_animation_wrap }>
                <Image 
                className={ styles.loading_animation }
                src={ LoadingAnimation }
                alt="" />
            </div>
        </div>
    )

    if( channels.length === 0 ) return (
        <div className={ styles.display_friend_list }>
                <Image 
                className={ styles.not_found_wrap }
                src={ NotFound }
                alt="" />
                <div className={ styles.not_found }>
                    {`sorry I didn't find any 
                    active channels you're in. 
                    You can find your friends 
                    in the search bar above ⬆⬆⬆`}
                </div>
        </div>
    )

    if( selector?.users ) return (
        <div className={ styles.display_friend_list }>
            {
                (selector && channels) && [...channels, selector].map( ( { users, id }: Channel ) => (
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