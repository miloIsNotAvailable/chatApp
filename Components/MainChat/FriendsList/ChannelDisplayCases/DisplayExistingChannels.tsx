import { Channel } from "@prisma/client";
import { FC } from "react";
import { useUserInfo } from "../../../constants/userConstants";
import DisplayChannels from "../DisplayChannels";
import { styles } from "../FriendListStyles";

export type ChannelType = Channel & { user?: any[] }

interface DisplayExistingChannels {
    channels: Channel[] | []
    // selected: string
}

const DisplayExistingChannels: FC<DisplayExistingChannels> 
= ( { channels } ) => {

    return (
        <div className={ styles.display_friend_list }>
            {
                channels && channels.map( ( { users, id, user }: ChannelType ) => (
                    <DisplayChannels
                        id={ id }
                        users={ user && user[0]?.name }
                        key={ id }
                    />
                ) )
            }
        </div>
    )
}

export default DisplayExistingChannels