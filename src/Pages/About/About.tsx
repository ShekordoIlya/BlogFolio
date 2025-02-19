import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  return (
    <>
      <button onClick={() => navigate(-2)}>Go back</button>
      <h1>About PAGE</h1>
    </>
  );
};
export default About;
