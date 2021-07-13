import {useEffect, useState} from 'react';
import axios from 'axios';

type Post = {
  id: string;
  date: string;
  title: string;
}
type Props = {
  posts: Post[]
}
export const usePosts = () => {
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
  return {posts, setPosts, isLoading, setIsLoading, isEmpty, setIsEmpty};
};