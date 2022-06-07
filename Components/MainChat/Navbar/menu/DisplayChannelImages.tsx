import { FC, useEffect } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useChannelImages } from "./getChannelImages";
import { styles } from "../Build/NavbarStyles";

interface DisplayChannelImgsProps {
    imgsList: string[] | null
}

const DisplayChannelImgs: FC<DisplayChannelImgsProps> 
= ( { imgsList } ) => {

    if( !imgsList ) return (
        <div>

        </div>
    )

    return (
        <div className={ styles.menu_imgs_wrap }>
            { imgsList && 
            imgsList.map( n => (
                // eslint-disable-next-line @next/next/no-img-element
                <img 
                    key={ n } 
                    src={ n }
                    alt=""
                    className={ styles.menu_img }
                />
            ) ) 
            }
        </div>
    )
}

export default DisplayChannelImgs