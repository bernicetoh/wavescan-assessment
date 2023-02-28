import React, { useState } from "react";
import "./Form.css";

function Form({ navigate }) {
  const scannerModeOptions = [
    { value: "Gantry", label: "Gantry" },
    { value: "Crawler", label: "Crawler" },
    { value: "Auto", label: "Auto" },
    { value: "Manual", label: "Manual" },
    { value: "Arm", label: "Arm" },
  ];

  const [pname, setPname] = useState("");
  const [mode, setMode] = useState(scannerModeOptions[0].value);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [freq, setFreq] = useState(0);
  const [formErrors, setFormErrors] = useState({});

  const validate = () => {
    let nameError = "";
    let dimError = "";
    let freqError = "";
    if (pname.length <= 3) {
      nameError = "Project name has to be more than 3 characters";
    }
    if (x < 1 || y < 1) {
      dimError = "Dimensions have to be more than or equals to 1";
    }
    if (freq < 1) {
      freqError = "Scanner frequency has to be more than or equals to 1";
    }
    if (nameError || dimError || freqError) {
      setFormErrors({ nameError, dimError, freqError });
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
      postInput();
      setFormErrors({});
    } else {
      console.log("invalid inputs!");
    }
  };

  const postInput = async () => {
    const toSend = {
      projectName: pname,
      scanningMode: mode.toUpperCase(),
      scanDimensionsX: x,
      scanDimensionsY: y,
      scannerFrequency: freq,
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
              onChange={(t) => setPname(t.target.value)}
              name="pname"
            />
            <p>{formErrors.nameError}</p>
          </div>

          <div className="input-container" style={{ paddingBottom: 20 }}>
            <label>Scanning Mode</label>
            <select
              className="select"
              value={mode}
              onChange={(t) => setMode(t.target.value)}
              name="mode"
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
                  onChange={(t) =>
                    t.target.value === ""
                      ? setX(0)
                      : setX(parseInt(t.target.value))
                  }
                  placeholder={"X"}
                  name="x"
                />
              </div>

              <div className="input-container">
                <input
                  type={"number"}
                  style={{ width: 130 }}
                  onChange={(t) =>
                    t.target.value === ""
                      ? setY(0)
                      : setY(parseInt(t.target.value))
                  }
                  placeholder={"Y"}
                  name="y"
                />
              </div>
            </div>
            <p>{formErrors.dimError}</p>
          </div>
          <div className="input-container">
            <label>Scanner Frequency (GHz)</label>
            <input
              step={0.1}
              type={"number"}
              onChange={(t) =>
                t.target.value === ""
                  ? setFreq(0)
                  : setFreq(parseFloat(t.target.value))
              }
            />
            <p>{formErrors.freqError}</p>
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
