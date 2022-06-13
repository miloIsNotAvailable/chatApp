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
                        href={ { pathname: `/home/${ link }`, query: { id: link } } }
                        key={ link }>
                            <div className={ styles.settings_icon }>
                                <Image
                                key={ link } 
                                className={ styles.settings_icon } 
                                src={ Icon } 
                                alt=""
                                layout="intrinsic"/>
                            </div>
                    </Link>:
                        <div key="micr" className={ styles.settings_icon }>
                            <Image 
                            key={ "mic" } 
                            className={ styles.settings_icon } 
                            src={ Icon } 
                            alt=""
                            layout="intrinsic"/>
                        </div>
                ) )
            }
        </div>
    )
}

export default Settings