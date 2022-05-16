import Link from "next/link";
import { FC } from "react";

import styles from '../../../styles/Login.module.css'

const RedirectToRegister: FC = () => {

    return (
        <div className={ styles.wrap_redirect }>
            <Link href="/register" className={ styles.register_button }>
                create an account
            </Link>
        </div>
    )
}

export default RedirectToRegister