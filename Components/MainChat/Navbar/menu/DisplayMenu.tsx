import { FC, useEffect } from "react";
import { useAppSelector } from "../../../store/hooks";
import { galleryIsOpenType } from "../../../store/interfaces";
import { styles } from "../Build/NavbarStyles";
import { motion, AnimatePresence } from 'framer-motion'
import { useChannelImages } from "./getChannelImages";
import DisplayChannelImgs from "./DisplayChannelImages";

export type isOpenType = { galleryOpen: galleryIsOpenType }

const DisplayMenu: FC = () => {

    const selector = useAppSelector( ( { galleryOpen }: isOpenType ) => galleryOpen?.open )

    const imgsList = useChannelImages()
    useEffect( () => {

        console.log( imgsList )
    }, [selector, imgsList] )

    return (
        <AnimatePresence>
            {
                selector && 
                <motion.div 
                    className={ styles.menu_wrap }
                    initial={ { width: 0 } }
                    animate={ { width: "30%" } }
                    exit={ { width: 0 } }
                >
                <DisplayChannelImgs imgsList={ imgsList }/>
                </motion.div>
            }
        </AnimatePresence>
    )
} 

export default DisplayMenu