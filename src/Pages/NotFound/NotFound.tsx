import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <h1>NotFound PAGE</h1>
      <NavLink to="/about">Go to About Page</NavLink>
      <NavLink to="/">Go to Home Page</NavLink>
    </>
  );
};
export default NotFound;
