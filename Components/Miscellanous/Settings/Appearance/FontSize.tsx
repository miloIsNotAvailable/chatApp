import { FC } from "react";
import { styles } from "../../MicStyles";

const FontSize: FC = () => {

    return (
        <div className={ styles.font_size_wrap }>
            <div>
                font size
            </div>
            <div className={ styles.font_size_align }>
                {
                    Array(3).fill( 'Aa' ).map( 
                        ( n: any, ind: number ) => (
                            <div 
                                className={ styles.font_size_icon }
                                key={ ind }
                                style={ { fontSize: `${ 1 + .5 * ind }vw` } }
                            >
                                { n }
                            </div>
                        ) 
                    ) 
                }
            </div>
        </div>
    )
}

export default FontSize