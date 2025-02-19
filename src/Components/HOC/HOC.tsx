import { useState } from "react";

const HOC = (WrappedComponent: any) => {
  return function (props: any) {
    const [count, setCount] = useState(0);
    const inc = () => setCount(count + 1);
    return (
      <div onClick={inc}>
        <WrappedComponent {...props} count={count} />
      </div>
    );
  };
};
export default HOC;
