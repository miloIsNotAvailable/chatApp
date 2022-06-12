import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AnimatePresence, motion } from 'framer-motion'

import { store } from '../Components/store/store'
import { Provider } from 'react-redux'
import { GetServerSideProps } from 'next'
import Head from 'next/head'

function MyApp({ Component, pageProps, router }: AppProps) {

  return (
    // <ApolloProvider client={ client }>
      <Provider store={ store }>
      <AnimatePresence exitBeforeEnter>
        <motion.div key={ router.route } 
          initial={{opacity: 0}} 
          animate={{opacity: 1}} 
          exit={{opacity: 0}} >
            <Head>
            <title>Babble</title>
            <meta  property="og:title" content="babble"/>
            <link rel="shortcut icon" href="/images/appIcon.png"/>
            <link rel="icon" type="image/png" sizes="16x16" href="/images/appIcon.png"/>
            <link rel="icon" type="image/png" sizes="32x32" href="/images/appIcon.png"/>
            <meta  property="og:image" content="/images/preview.png"/>
            <meta  property="og:description" content="justa quick hobby project"/>
          </Head>
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
      </Provider>
    // </ApolloProvider>
  )
}

export default MyApp
