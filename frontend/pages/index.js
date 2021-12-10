import Head from 'next/head'

import Login from '../components/login'

export default function Home() {
  return (
    <div>
      <Head>
        <title>login | absence manager </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Login></Login>
    </div>
  )
}
