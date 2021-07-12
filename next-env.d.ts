/// <reference types="next" />
/// <reference types="next/types/global" />
/// <reference types="next/image-types/global" />
type Post = {
  id: string;
  date: string;
  title: string;
}
type Props = {
  posts: Post[]
}