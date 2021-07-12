import {NextPage} from 'next';
import React from 'react';
import {usePosts} from 'hooks/usePosts';

const PostsIndex: NextPage = () => {
  const {isLoading, isEmpty, posts} = usePosts();
  return (
    <div>
      <h1>文章列表</h1>
      {isLoading ? <div>正在加载中</div> :
        isEmpty ? <div>正在构思中...目前还有没有文章</div> :
          <ul>
            {posts.map((post) => {
              return (
                <li key={post.id}>{post.title}</li>
              );
            })}
          </ul>
      }
    </div>
  );
};
export default PostsIndex;