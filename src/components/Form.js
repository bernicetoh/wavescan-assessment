import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
    const errorsNow = {};

    if (pname.length <= 3) {
      errorsNow.pname = "Project name has to be more than 3 characters";
    }

    if (x < 1 || y < 1) {
      errorsNow.dimension = "Dimensions have to be more than or equals to 1";
    }
    if (freq < 1) {
      errorsNow.freq = "Scanner frequency has to be more than or equals to 1";
    }
    return errorsNow;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleScan = async () => {
    console.log(x, y, pname);

    setFormErrors(validate());

    if (Object.keys(formErrors).length === 0) {
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
            {formErrors.pname}
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
            <p>{formErrors.dimension}</p>
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
            <p>{formErrors.freq}</p>
          </div>
          <div className="button-container">
            <input
              className="scanBtn"
              type="submit"
              value="Scan"
              onClick={handleScan}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
