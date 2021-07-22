import React from 'react';
import Link from 'next/link';

type Options = {
  page: number;
  totalPage: number;
  urlMaker?: (page: number) => string
}
const defaultUrlMaker = (page: number) => `?page=${page}`;
export const usePager = (options: Options) => {
  const {page, totalPage, urlMaker} = options;
  const _urlMaker = urlMaker || defaultUrlMaker;
  let pages = [];
  const extend = 1;
  for (let i = 1; i <= totalPage; i++) {
    if (i == 1 || i == totalPage) pages.push(i);
    else if (i >= page - extend && i <= page + extend) pages.push(i);
    else if (pages[pages.length - 1] != -1) {
      pages.push(-1);
    }
  }
  const pager = (
    <div className='wrapper'>
      {page !== 1 ? <Link href={_urlMaker(page - 1)}><a>上一页</a></Link> : null}
      {pages.map((page, index) => page > 0 ? <Link key={index} href={_urlMaker(page)}><a>{page}</a></Link> :
        <span key={index}>...</span>)}
      {page !== totalPage ? <Link href={_urlMaker(page + 1)}><a>下一页</a></Link> : null}
      <span>
    {`第${page}页 共${totalPage}页`}
 </span>
      <style jsx>{`
      .wrapper{
          margin:0 -8px  
      }
      .wrapper > a, .wrapper> span {
          margin:0 8px  
      }

`}
      </style>
    </div>

  );
  return {
    pager
  };
};