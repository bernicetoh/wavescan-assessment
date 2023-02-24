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
  const [x, setX] = useState(null);
  const [y, setY] = useState(null);
  const [freq, setFreq] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const validate = () => {
    const errors = {};
    if (pname.length <= 3) {
      errors.pname = "Project name has to be more than 3 characters";
    }

    if (!x || !y || x < 1 || y < 1) {
      errors.dimension = "Dimensions have to be more than or equals to 1";
    }
    if (!freq || freq < 1) {
      errors.freq = "Scanner frequency has to be more than or equals to 1";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(validate());
    if (Object.keys(errors).length === 0) {
      setIsSubmit(true);
    }

    if (isSubmit) {
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
    } else {
      alert("Invalid inputs!");
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
            <p>{errors.pname}</p>
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
            <p>{errors.dimension}</p>
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
