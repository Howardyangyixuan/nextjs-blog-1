import {NextPage} from 'next';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

type Post = {
  id: string;
  date: string;
  title: string;
}
const PostsIndex: NextPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  useEffect(() => {
    setIsLoading(true);
    axios.get('api/v1/posts').then((response) => {
      setPosts(response.data);
      setIsLoading(false);
      if (response.data.length == 0) setIsEmpty(true);
    }, () => {
      setIsLoading(false);
    });
  }, []);
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