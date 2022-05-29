import { Channel } from "@prisma/client";
import { FC, useEffect } from "react";
import { useAppSelector } from "../../../store/hooks";
import { ObservableType } from "../../../store/interfaces";
import DisplayChannels from "../DisplayChannels";
import { styles } from "../FriendListStyles";

interface DisplayNewChannelsProps {
    channels: Channel[]
}

type State = { newChannel: ObservableType }

const DisplayNewChannels: FC<DisplayNewChannelsProps> 
= ( { channels } ) => {

    const selector = useAppSelector( ( state: State ) => state?.newChannel || [] )
    useEffect( () => console.log( selector ), [ selector ] )

    if( !selector?.users ) return <></>

    return (
        <div className={ styles.display_friend_list }>
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
        </div>
    )
}

export default DisplayNewChannels