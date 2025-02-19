import { useEffect, useState } from "react";

const Timer = () => {
  const [second, setSecond] = useState(0);
  useEffect(() => {
    console.log("in use Effect");
    const intveral = setInterval(() => {
      setSecond((prev) => prev + 1);
      console.log("tic");
    }, 1000);
    return () => {
      console.log("компонента размонтирована");
      clearInterval(intveral);
    };
  }, []);

  return <div>Прошло секунд: {second}</div>;
};
export default Timer;
