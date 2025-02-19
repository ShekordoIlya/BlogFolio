import { useContext, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as Light } from "../../assets/light.svg";
import { ReactComponent as Dark } from "../../assets/dark.svg";
import { ActiveContext, ThemeContext } from "../../Сontext/Context";

import styles from "./Navbar.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { switchTheme } from "../../store/themeSlice";
import { checkValidToken, stopTokenUpdate } from "../../store/SignInSlice";
const Navbar = () => {
  const context = useContext(ActiveContext);
  const { auth } = useSelector((state) => state.signIn);
  const dispatch = useDispatch();
  const { active, navbar, nonActive } = styles;

  useEffect(() => {
    dispatch(checkValidToken());
  }, []);
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  const myClass =
    () =>
    ({ isActive }: { isActive: boolean }) =>
      isActive ? `${active}` : `${nonActive}`;
  const closeSlideBar = () => context?.SetIsActive(!context.isActive);
  const signInHandler = () => {
    navigate("/sign-in", { state: { from: location } });
    closeSlideBar();
  };
  return (
    <div className={!context?.isActive ? navbar : `${navbar} ${active}`}>
      <nav>
        <NavLink onClick={closeSlideBar} className={myClass()} to="/">
          Home
        </NavLink>
        <NavLink onClick={closeSlideBar} className={myClass()} to="/about-us">
          About us
        </NavLink>
        <NavLink onClick={closeSlideBar} className={myClass()} to="/posts">
          posts
        </NavLink>
        {auth && (
          <>
            <NavLink
              onClick={closeSlideBar}
              className={myClass()}
              to="/my-posts"
            >
              My Posts
            </NavLink>
            <NavLink
              onClick={closeSlideBar}
              className={myClass()}
              to="/create-post"
            >
              Create Post
            </NavLink>
          </>
        )}

        {!auth ? (
          <>
            <button onClick={signInHandler}>Sign in</button>
          </>
        ) : (
          <button onClick={() => dispatch(stopTokenUpdate())}>Log out</button>
        )}
      </nav>

      <div style={{ marginBottom: "5rem" }}></div>
      <button onClick={() => dispatch(switchTheme("light"))}>
        <Light />
      </button>
      <button onClick={() => dispatch(switchTheme("dark"))}>
        <Dark />
      </button>
    </div>
  );
};
export default Navbar;
