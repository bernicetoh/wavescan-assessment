import React, { useState } from "react";

import "./SelectInput.css";
function SelectInput({ options, title, styles, setValue }) {
  const [selected, setSelected] = useState(options[0]);

  const handleChange = (s) => {
    setSelected(s.value);
    setValue(s.target.value.toUpperCase());
    console.log(s.target.value.toUpperCase());
  };

  return (
    <div className="input-container">
      <label>{title}</label>
      <select
        className="select"
        style={styles}
        value={selected}
        onChange={(s) => handleChange(s)}
      >
        {options.map((op) => {
          return <option key={options.indexOf(op)}>{op.value}</option>;
        })}
      </select>
    </div>
  );
}

export default SelectInput;
