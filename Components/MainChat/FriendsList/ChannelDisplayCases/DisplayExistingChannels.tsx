import { Channel } from "@prisma/client";
import { FC } from "react";
import { useUserInfo } from "../../../constants/userConstants";
import DisplayChannels from "../DisplayChannels";
import { styles } from "../FriendListStyles";

interface DisplayExistingChannels {
    channels: Channel[] | []
    // selected: string
}

const DisplayExistingChannels: FC<DisplayExistingChannels> 
= ( { channels } ) => {

    const { name } = useUserInfo()

    return (
        <div className={ styles.display_friend_list }>
            {
                channels && channels.map( ( { users, id }: Channel ) => (
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

export default DisplayExistingChannels