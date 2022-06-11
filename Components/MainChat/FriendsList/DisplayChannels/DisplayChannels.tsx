import { FC } from "react";
import { useUserInfo } from "../../../constants/userConstants";
import { useFriendListContext } from "../../../contexts/friendListContext";
import { displayFriendName } from "../displayFriendName";
import DisplayFriend from "./DisplayFriend";

interface DisplayChannelsProps {

    id: string | null, 
    users: string[],
}

const DisplayChannels: FC<DisplayChannelsProps> 
= ( { id, users } ) => {

    const { setSelected } = useFriendListContext()

    return <DisplayFriend 
    redirectTo={ id }
    name={ users }
    key={ id } 
    cssStyles={ null }
    handleClick={ setSelected }/>
}

export default DisplayChannels