import { Channel } from "@prisma/client";
import { FC, useContext, useEffect, useState } from "react";
import { of } from "rxjs";
import { _io } from "../../constants/WebSocketsConstants";
import { SessionRerouteContext } from "../../contexts/context";
import { useAppDispatch } from "../../store/hooks";
import { getChannelUsername } from "../../store/showChannelUsername";
import DisplayFriend from "./DisplayFriend";
import { displayFriendName } from "./displayFriendName";
import { useFetch } from "./FetchChannels";
import { styles } from "./FriendListStyles";
import { joinRoomOnClick } from "./joinRoomOnClick";
import LoadingAnimation from '../../../graphics/Loading.svg'
import Image from "next/image";
import { useUserInfo } from "../../constants/userConstants";

const FriendList: FC = () => {

    const sessionContext = useContext( SessionRerouteContext )

    const arr: Channel[] | null = sessionContext?.channels || null
    const[ selected, setSelected ] = useState<string | null>( arr ? arr[0]?.id : null )
    const { channels } = useFetch<Channel[]>( '/api/get_channels', sessionContext ) || { channels: null }
    

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

    if( !channels || channels.length === 0 ) return (
        <div className={ styles.display_friend_list }>
            <div className={ styles.loading_animation_wrap }>
                <Image 
                className={ styles.loading_animation }
                src={ LoadingAnimation }
                alt="" />
            </div>
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