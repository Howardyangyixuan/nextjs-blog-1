import React from "react"
import Link from "next/link"
import Head from "next/head"
import styles from "styles/FirstPost.module.css"
import png from "assets/images/3.png"
import freestyle from "public/freestyle.png"
import Image from "next/image"

export default function FirstPost() {
  return (
    <React.Fragment>
      <div>First Page
        <div className={styles.wrapper}>
          <div className={styles.content}>hi</div>
        </div>
        <Image src={png}/>
        <Image src={freestyle}/>
        <hr/>
        <Link href="/"><a>回到首页</a></Link>
      </div>
    </React.Fragment>
  )
}