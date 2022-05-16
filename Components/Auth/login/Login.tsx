import { FC } from "react";
import BuildLogin from "./BuildLogin";

import { motion, AnimatePresence } from 'framer-motion'

const Login: FC = () => {
    return ( 
        <motion.div>
            <BuildLogin/>
        </motion.div>
     )
}

export default Login