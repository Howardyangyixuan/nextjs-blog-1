import {NextPage} from 'next';
import Link from 'next/link';
import logo from '/assets/images/logo.png';
import React from 'react';

const Home: NextPage = () => {
  return (
    <>
      <div className="cover">
        <img src={logo.src} alt=''/>
        <h1>杨义轩的个人博客</h1>
        <p>我是一个很爱学习的人</p>
        <p><Link href="./posts" ><a>文章列表</a></Link></p>
      </div>
      <style jsx>{`
      .cover{
        height: 100vh;
        display:flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      }
      .cover > img{
        width: 240px; 
        height: 240px;
      }
      `}</style>
    </>
  );
};

export default Home;
