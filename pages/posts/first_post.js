import React from "react"
import Link from "next/link"
import Head from "next/head"

export default function FirstPost() {
  return (
    <React.Fragment>
      <div>First Page
        <hr/>
        <Link href="/"><a>回到首页</a></Link>
      </div>
    </React.Fragment>
  )
}