import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import Button from '../components/Button'
import Head from 'next/head'

const Home: NextPage = () => {

  return ( <>
  {/* Head title is need for Trust Wallet to be able to work */}
  <Head>
    <title>Create Next App</title>
  </Head>
      <div className={styles.container}>
        <Button/>
      </div>
      </>
  )
}

export default Home
