import { FC } from "react";
import { styles } from "./registerStyles";

const AnimatedString: FC = () => {

    const _string = 'account.'.split("")

    return (
        <div className={ styles.register_bg_title }>
        setup - 
        <div>your</div> 
        <div className={ styles.account }>
            { _string.map( ( e: string, ind: number ) => (
                <div 
                    className={ styles.string } 
                    key = { e }
                    style = { {
                        animationDelay: `${ ind * 70 }ms`
                    } }>
                    { e }
                </div>
            ) ) }
        </div>
    </div>
    )
}

export default AnimatedString