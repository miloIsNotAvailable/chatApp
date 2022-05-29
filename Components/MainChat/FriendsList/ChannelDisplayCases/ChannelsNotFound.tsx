import Image from "next/image";
import { FC } from "react";
import NotFound from '../../../../graphics/NotFound.svg'
import { styles } from "../FriendListStyles";

const ChannelsNotFound: FC = () => {

    return (
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
}

export default ChannelsNotFound