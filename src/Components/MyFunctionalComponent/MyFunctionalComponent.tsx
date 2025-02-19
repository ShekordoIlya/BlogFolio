import { useEffect, useState } from "react";

interface IProps {
  isActive: boolean;
}
const MyFunctionalComponent = ({ isActive }: IProps) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log("mount/update");
    return () => console.log("unmount");
  }, [isActive]);
  return (
    <>
      {console.log("render")}
      <div>
        <button onClick={() => setCount(count + 1)}>Update State</button>
        In my functional component {isActive ? `is active` : `is not active`}
      </div>
    </>
  );
};
export default MyFunctionalComponent;
