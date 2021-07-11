import React from "react"
import Link from "next/link"
import Head from "next/head"
import styles from "styles/FirstPost.module.css"

export default function FirstPost() {
  return (
    <React.Fragment>
      <div>First Page
        <div className={styles.wrapper}>
          <div className={styles.content}>hi</div>
        </div>
        <img src="/3.png" alt=""/>
        <hr/>
        <Link href="/"><a>回到首页</a></Link>
      </div>
    </React.Fragment>
  )
}