import { useState } from "react";

const Input = () => {
  const [textField, setTextField] = useState("my text");
  const [inputField, setInputField] = useState("");
  const [textArea, setTextArea] = useState("");
  console.log(inputField);
  return (
    <div>
      <h2>{textField}</h2>
      <input
        type="text"
        value={inputField}
        onChange={(e) => setInputField(e.target.value)}
      />
      <textarea
        value={textArea}
        onChange={(e) => setTextArea(e.target.value)}
      />
      <button
        onClick={() => {
          setTextField(textArea);
        }}
      >
        Click
      </button>
    </div>
  );
};
export default Input;
