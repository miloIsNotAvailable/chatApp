import type { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import Login from '../Components/Auth/login'
import Head from 'next/head'
import Preview from '../graphics/preview.png'

/**
 * load the cookies before html 
 * to determine whether the user 
 * is logged in and based on that 
 * determine whether they should be 
 * redirected to /home or login screen.   
 * We're loading everything before 
 * html so that the website 
 * doesn't go funky mode
 */

export const getServerSideProps: 
GetServerSideProps = async( { req } ) => {

    const session = req.cookies.sessionToken

    // redirect to home 
    // if user's logged in
    if( session ) return {
        redirect: {
          destination: "/home", 
          // god knows what this does
          permanent: false
        }
    }

    return {
      props: {  }
    }
}

const Home: NextPage = ( ) => {

  return (
    <div>
      <Login/>
    </div>
  )
}

export default Home
