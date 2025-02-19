import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyPosts } from "../../store/myPostsSlice";

const MyPosts = () => {
  const dispatch = useDispatch();
  const { myPosts, isLoading } = useSelector((state) => state.myPosts);
  useEffect(() => {
    dispatch(getMyPosts());
  }, []);
  console.log("myPosts", myPosts);
  return (
    <div>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          {myPosts.map(({ image, date, text, title }: any) => {
            return (
              <div>
                <img src={image} alt={text} />
                <h2>{date}</h2>
                <h3>{title}</h3>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default MyPosts;
