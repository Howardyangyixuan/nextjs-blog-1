import '../styles/globals.css'
import Head from "next/head"

function MyApp({ Component, pageProps }) {
  return <div className="hi">
    <Head>
      <title>my blog</title>
    </Head>
    <Component {...pageProps} /></div>
}

export default MyApp
