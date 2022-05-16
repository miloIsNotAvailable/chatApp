import type { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { prisma } from '../lib/prisma'

import Login from '../Components/Auth/login'
import { AnimatePresence } from 'framer-motion'

// export const getStaticProps: GetStaticProps = async() => {
//   const posts = await prisma.user.create({
//     data: {
//       id: '321', 
//       name: 'hello', 
//       email: 'mail11@gmail.com', 
//     }
//   })
//   console.log(posts)
//   return { props: { e: 'hello' } }
// }

const Home: NextPage = () => {

  return (
    <div>
      <Login/>
    </div>
  )
}

export default Home
