import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { activateUser } from "../../store/userSlice";

const Activate = () => {
  const data = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(activateUser(data));
  }, []);
  return (
    <div>
      Please activate your account with the activation link in the email
      example@gmail.com.Please, check your email
    </div>
  );
};
export default Activate;
