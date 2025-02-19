import { useState } from "react";

const Select = () => {
  const [value, setValue] = useState("book");
  return (
    <select value={value} onChange={(e) => setValue(e.target.value)}>
      <option value="book">book</option>
      <option value="laptop">laptop</option>
      <option value="Notebook">Notebook</option>
    </select>
  );
};
export default Select;
