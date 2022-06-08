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
        <div className={ styles.privacy_wrap }>
            <div className={ styles.title }>
                privacy
            </div>
            <div>
            </div>
        </div>
        <div className={ styles.account_wrap }>
            <div className={ styles.title }>
                account
            </div>
            <div>
            </div>
        </div>
    </MiscLayout>
    )
}

export default Settings