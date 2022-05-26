import { FC } from "react";

import SettingsIcon from '../../../graphics/settings.svg'
import MicIcon from '../../../graphics/mic.svg'
import FriendsIcon from '../../../graphics/friends.svg'
import NotificationsIcon from '../../../graphics/notifications.svg'
import Link from "next/link";
import Image from "next/image";
import { styles } from "./SettingsStyles";

const Settings: FC = () => {

    const arr = [
        {
            link: 'settings', 
            Icon: SettingsIcon, 
        }, 
        {
            link: 'notifications', 
            Icon: NotificationsIcon, 
        }, 
        {
            link: 'friends', 
            Icon: FriendsIcon, 
        }, 
        { 
            Icon: MicIcon, 
        }, 
    ]

    return (
        <div className={ styles.wrap_settings }>
            {
                arr.map( ( { link, Icon } ) => (
                    link ? 
                    <Link 
                        href={ { pathname: `/home/${ link }` } }
                        key={ link }>
                            <Image 
                            className={ styles.settings_icon } 
                            src={ Icon } 
                            alt=""
                            layout="intrinsic"/>
                    </Link>:
                    <div>
                        <Image className={ styles.settings_icon } src={ Icon } alt=""/>
                    </div>
                ) )
            }
        </div>
    )
}

export default Settings