import { memo } from "react";

const Display = memo(({ inc }: { inc: () => void }) => {
  console.log("render display component");
  return <button onClick={inc}>Inc Count</button>;
});
export default Display;
