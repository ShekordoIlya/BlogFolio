import { useCallback, useState } from "react";
import Display from "./Display";

const Counter = () => {
  const [count, setCount] = useState(0);
  console.log("counter");
  const inc = useCallback(() => {
    console.log("click", count);
    setCount((prev) => prev + 1);
  }, []);
  const arr1 = [1, 2, 3, 4, 5];
  return (
    <div>
      {arr1.map((item) => (
        <div>
          <p>
            {item} Сount: {count}
          </p>
          <Display inc={inc} />
        </div>
      ))}
    </div>
  );
};
export default Counter;
