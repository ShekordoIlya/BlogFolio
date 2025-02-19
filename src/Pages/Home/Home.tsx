import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { increment } from "../../store/counterSlice";

const Home = () => {
  const navigate = useNavigate();
  const person = {
    name: "BOB",
    age: 20,
  };
  const { count } = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  return (
    <>
      <button onClick={() => navigate("/about")}>Go to about</button>
      <button onClick={() => navigate("/notfound")}>Go to notfound</button>
      <NavLink to={"/profile/1?showBanner=true#hash=value"} state={person}>
        Go to Profile Page
      </NavLink>
      <h1> {count}</h1>
      <button onClick={() => dispatch(increment(1))}>inc</button>
    </>
  );
};
export default Home;
