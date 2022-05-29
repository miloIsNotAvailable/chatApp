import Image from "next/image";
import { FC } from "react";
import LoadingAnimation from '../../../../graphics/Loading.svg'
import { styles } from "../FriendListStyles";

const ChannelsLoading: FC = () => {

    return (
        <div className={ styles.display_friend_list }>
            <div className={ styles.loading_animation_wrap }>
                <Image 
                className={ styles.loading_animation }
                src={ LoadingAnimation }
                alt="" />
            </div>
        </div>
    )
}

export default ChannelsLoading