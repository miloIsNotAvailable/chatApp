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

    const { name } = useUserInfo()
    const { selected, setSelected } = useFriendListContext()

    return <DisplayFriend 
    redirectTo={ id }
    name={ displayFriendName( users, name ) }
    key={ id } 
    cssStyles={ null }
    handleClick={ setSelected }/>
}

export default DisplayChannels