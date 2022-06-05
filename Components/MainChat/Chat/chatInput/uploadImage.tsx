import { FC } from "react";
import { styles } from "../ChatStyles";

const UploadImage: FC = () => {

    return (
        <div className={ styles.upload_image }>
            +
            <input type="file" placeholder=""/>
        </div>
    )
}

export default UploadImage