import { FC } from "react";
import { styles } from "../../MicStyles";

const HighlightMsgs: FC = () => {

    return (
        <div className={ styles.highlight_wrap }>
            <div className={ styles.setting_title }>
                highlight your messages
            </div>
            <div className={ styles.highlight_button }>
                <div className={ styles.highlight_button_inside }/>
            </div>
        </div>
    )
}

export default HighlightMsgs