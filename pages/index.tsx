import {NextPage} from 'next';
import Link from 'next/link';
import logo from '/assets/images/logo.png';
import React from 'react';

const Home: NextPage = () => {
  return (
    <>
      <div className="cover">
        <img src={logo.src} alt=''/>
        <h1>心灵树洞</h1>
        <p>一个可以畅所欲言的地方</p>
        <p><Link href="./posts"><a>进入树洞</a></Link></p>
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
