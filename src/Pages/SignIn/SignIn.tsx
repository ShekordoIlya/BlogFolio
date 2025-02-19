import { useEffect, useState } from "react";
import styles from "./SignIN.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { refreshToken, signInUser } from "../../store/SignInSlice";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "@reduxjs/toolkit";
import { Link, useLocation, useNavigate } from "react-router-dom";
interface ILogin {
  email: string;
  password: string;
}
const SignIn = () => {
  const [loginData, setLoginData] = useState<ILogin>({
    email: "",
    password: "",
  });
  const { pathname } = (useLocation().state || { from: "/" }).from;
  const { auth } = useSelector((state) => state.signIn);
  const navigate = useNavigate();
  console.log("pathname in sign in ", pathname);
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };
  const dispatch = useDispatch();
  const formHandler = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(signInUser(loginData));
  };
  useEffect(() => {
    if (auth) {
      navigate(pathname, { replace: true });
    }
  }, [auth]);
  return (
    <div>
      <form className={styles.form} onSubmit={formHandler}>
        <input
          type="email"
          name="email"
          onChange={inputHandler}
          placeholder="enter your email"
        />
        <input
          type="password"
          name="password"
          placeholder="enter your password"
          onChange={inputHandler}
        />
        <button type="submit">Log in</button>
      </form>
      <Link to={"/sign-up"}>Sign UP</Link>
    </div>
  );
};
export default SignIn;
