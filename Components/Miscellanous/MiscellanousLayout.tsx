import { FC } from "react";
import { styles } from "./MicStyles";

interface MiscLayoutProps {
    children: JSX.Element | JSX.Element[] | string
}

const MiscLayout: FC<MiscLayoutProps> 
= ( { children } ) => {

    return (
        <div className={ styles.misc_wrap }>
            { children }
        </div>
    )
}

export default MiscLayout