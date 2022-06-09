import { FC, useEffect, useState } from "react";
import { styles } from "../../MicStyles";
import { motion } from 'framer-motion'
import { clientSide } from "../../../constants/clientSide";

type sizeType = {
    content: string;
    fontSize: string;
}

const FontSize: FC = () => {

    const arr: sizeType[] = [
        { content: 'Aa', fontSize: '1vw' },
        { content: 'Aa', fontSize: '1.5vw' },
        { content: 'Aa', fontSize: '2vw' },
    ]

    const[ selectedFont, setSelectedFont ] = useState<sizeType>( () => {
        
        if ( !clientSide ) return arr[1]

        const val = clientSide ? localStorage.getItem( 'selectedFont' ) : null
        const parsed = val ? JSON.parse( val ) : null


        return parsed || arr[1]
    
    } )

    useEffect( () => {

        document.body.style.cssText=`
            --msg-font-size: ${ selectedFont.fontSize }
        `

        localStorage.setItem( 'selectedFont', JSON.stringify( selectedFont ) )

        console.log( selectedFont )
    }, [ selectedFont ] )

    return (
        <div className={ styles.font_size_wrap }>
            <div className={ styles.setting_title }>
                font size
            </div>
            <div className={ styles.font_size_align }>
                {
                    arr.map( 
                        ( 
                            { content, fontSize }: sizeType, 
                            ind: number 
                        ) => (
                            <motion.div 
                                className={ styles.font_size_icon }
                                key={ ind }
                                style={ { fontSize } }
                                onClick={ () => setSelectedFont( { content, fontSize } ) }
                            >
                                <p>{ content }</p>
                                <motion.div
                                    animate={ 
                                        selectedFont?.fontSize === fontSize ? 
                                        { width: '100%' } : { width: '0%' }
                                    } 
                                    className={ styles.underline }
                                />
                            </motion.div>
                        ) 
                    ) 
                }
            </div>
        </div>
    )
}

export default FontSize