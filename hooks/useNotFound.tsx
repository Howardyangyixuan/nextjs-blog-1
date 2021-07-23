import React, {useEffect} from 'react';
import Link from 'next/link';

type Options = {
  title?: string
  urlMaker?: () => string
}
const defaultUrlMaker = () => '/posts';
export const useNotFound = (options?: Options) => {
  const {title, urlMaker} = options || {};
  const _urlMaker = urlMaker || defaultUrlMaker;
  const _title = title || '返回列表';
  useEffect(() => {
    window.alert('当前页面不存在');
    window.location.href = _urlMaker();
  }, []);
  const notFound = (
    <div className='wrapper'>
      <Link href={_urlMaker()}><a>{_title}</a></Link>
      <style jsx>{`
      .wrapper{
          margin:0 -8px  
      }
      .wrapper > a, .wrapper> span {
          margin:0 8px  
      } 
      `}</style>
    </div>
  );
  return (
    notFound
  );
};