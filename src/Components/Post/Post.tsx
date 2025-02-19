import { useEffect, useState } from "react";

interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const Post = () => {
  const [post, setPost] = useState<IPost>({
    userId: 1,
    id: 1,
    title: "hey",
    body: "lorem",
  });
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts/10")
      .then((response) => response.json())
      .then((json) => setPost(json));
  }, []);

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
};
export default Post;
