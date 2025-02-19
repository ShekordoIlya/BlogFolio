import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { signUpUser } from "../../store/userSlice";

const SignUp = () => {
  const [registraionData, setRegistrationData] = useState({
    username: "",
    email: "",
    password: "",
    course_group: 14,
  });
  const dispatch = useDispatch();

  const formHandler = (e: React.ChangeEvent<HTMLFormElement>) => {
    e?.preventDefault();
    dispatch(signUpUser(registraionData));
  };

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegistrationData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div>
      <h1>Fill fields below to sign up</h1>
      <form
        onSubmit={formHandler}
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          width: "500px",
        }}
      >
        <input
          type="text"
          name="username"
          value={registraionData.username}
          placeholder="username"
          onChange={inputHandler}
        />
        <input
          type="email"
          name="email"
          value={registraionData.email}
          placeholder="email"
          onChange={inputHandler}
        />
        <input
          type="password"
          name="password"
          value={registraionData.password}
          placeholder="password"
          onChange={inputHandler}
        />
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};
export default SignUp;
