import React from "react";
import "./Input.css";

function Input({ step, type, title, styles, placeholder, setValue, validate }) {
  return (
    <div className="input-container">
      <label>{title}</label>
      <input
        step={step}
        type={type}
        name={title}
        style={styles}
        placeholder={placeholder}
        onChange={(t) => {
          if (step === "0.1") {
            setValue(parseFloat(t.target.value));
          } else if (type === "number") {
            setValue(parseInt(t.target.value));
          } else {
            setValue(t.target.value);
          }
          validate(t);
        }}
      />
    </div>
  );
}

export default Input;
