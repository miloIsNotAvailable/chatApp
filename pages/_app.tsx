import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AnimatePresence, motion } from 'framer-motion'

import { store } from '../Components/store/store'
import { Provider } from 'react-redux'

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <Provider store={ store }>
    <AnimatePresence exitBeforeEnter>
      <motion.div key={ router.route } 
        initial={{opacity: 0}} 
        animate={{opacity: 1}} 
        exit={{opacity: 0}} >

        <Component {...pageProps} />
      </motion.div>
    </AnimatePresence>
    </Provider>
  )
}

export default MyApp
