import { FC } from "react";
import { styles } from "../../MicStyles";
import MiscLayout from "../../MiscellanousLayout";
import FontSize from "../Appearance/FontSize";
import HighlightMsgs from "../Appearance/highlightMsgs";

const Settings: FC = () => {
    return (
    <MiscLayout>
        <div className={ styles.appearance_wrap }>
            <div className={ styles.title }>
                appearance
            </div>
            <div>
                <FontSize/>
                <HighlightMsgs/>
            </div>
        </div>
    </MiscLayout>
    )
}

export default Settings