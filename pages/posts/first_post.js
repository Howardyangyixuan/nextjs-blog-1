import React from "react"
import Link from "next/link"
import Head from "next/head"

export default function x() {
  return (
    <React.Fragment>
      <Head>
        <title>Ch1</title>
      </Head>
      <div>First Page
        <hr/>
        <Link href="/"><a>回到首页</a></Link>
      </div>
    </React.Fragment>
  )
}