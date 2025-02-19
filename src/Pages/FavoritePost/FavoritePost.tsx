import { useSelector } from "react-redux";

const FavoritePost = () => {
  const { selectedPost } = useSelector((state) => state.posts);
  return (
    <div>
      <p>{selectedPost.description}</p>
    </div>
  );
};
export default FavoritePost;
