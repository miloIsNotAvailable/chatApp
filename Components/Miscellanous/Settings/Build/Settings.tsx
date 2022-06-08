import { FC } from "react";
import { styles } from "../../MicStyles";
import MiscLayout from "../../MiscellanousLayout";
import FontSize from "../Appearance/FontSize";

const Settings: FC = () => {
    return (
    <MiscLayout>
        <div>
            <div className={ styles.title }>
                appearance
            </div>
            <FontSize/>
        </div>
    </MiscLayout>
    )
}

export default Settings