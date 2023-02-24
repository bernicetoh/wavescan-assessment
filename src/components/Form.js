import React, { useState } from "react";
import "./Form.css";

function Form({ navigate }) {
  const [pname, setPname] = useState("");
  const [scannerFreq, setScannerFreq] = useState(0);
  const [scanMode, setScanMode] = useState("");
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const validate = (pname, scannerFreq, x, y) => {
    const errors = {};
    if (pname.length <= 3) {
      errors.pname = "Project name has to be more than 3 characters";
    }

    if (x < 1 || y < 1) {
      errors.dimension = "Dimensions have to be more than or equals to 1";
    }

    if (scannerFreq < 1) {
      errors.freq = "Scanner frequency has to be more than or equals to 1";
    }
    return errors;
  };

  const scannerModeOptions = [
    { value: "Gantry", label: "Gantry" },
    { value: "Crawler", label: "Crawler" },
    { value: "Auto", label: "Auto" },
    { value: "Manual", label: "Manual" },
    { value: "Arm", label: "Arm" },
  ];

  const handleOptionsInput = (selected) => {
    setScanMode(selected.target.value.toUpperCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(validate(pname, scannerFreq, x, y));
    const toSend = {
      projectName: pname,
      scanningMode: scanMode.toUpperCase(),
      scanDimensionsX: x,
      scanDimensionsY: y,
      scannerFrequency: scannerFreq,
    };
    try {
      const result = await fetch(
        "https://wavescan-internship.saurabhmudgal.repl.co/submitForm",
        {
          method: "POST",
          body: JSON.stringify(toSend),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const statusCode = result.status;
      console.log(statusCode);
      if (statusCode === 200) {
        console.log("success!");
        navigate("./view", { replace: true });
      } else {
        console.log("ERROR 404: bad request");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div id="form">
      <div className="form-container">
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="input-container">
            <label>Project Name</label>
            <input
              type={"text"}
              onChange={(text) => setPname(text.target.value)}
              value={pname.target}
            />
            <p>{errors.pname}</p>
          </div>

          <div className="input-container" style={{ paddingBottom: 20 }}>
            <label>Scanning Mode</label>
            <select
              className="select"
              value={scanMode}
              onChange={(s) => {
                console.log(s.target.value.toUpperCase());
                setScanMode(s.target.value);
              }}
            >
              {scannerModeOptions.map((op) => {
                return (
                  <option key={scannerModeOptions.indexOf(op)}>
                    {op.value}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="dimensions-container">
            <label>Scan Dimensions (cm)</label>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div className="input-container">
                <input
                  style={{ width: 130 }}
                  type={"number"}
                  onChange={(text) => setX(parseInt(text.target.value))}
                  placeholder={"X"}
                />
              </div>

              <div className="input-container">
                <input
                  type={"number"}
                  style={{ width: 130 }}
                  onChange={(text) => setY(parseInt(text.target.value))}
                  placeholder={"Y"}
                />
              </div>
            </div>
            <p>{errors.dimension}</p>
          </div>
          <div className="input-container">
            <label>Scanner Frequency (GHz)</label>
            <input
              step={0.1}
              type={"number"}
              onChange={(text) => setScannerFreq(parseFloat(text.target.value))}
            />
            <p>{errors.freq}</p>
          </div>
          <div className="button-container">
            <input className="scanBtn" type="submit" value="Scan" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
