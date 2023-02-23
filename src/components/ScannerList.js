import React, { useEffect, useState } from "react";
import ConnectButton from "./ConnectButton";
import "./ScannerList.css";
function ScannerList({ navigate }) {
  const [scanners, setScanners] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(
          " https://wavescan-internship.saurabhmudgal.repl.co/success"
        );
        const resultInJson = await result.json();
        setScanners(resultInJson);
        console.log(resultInJson);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
    console.log(scanners.length);
  }, []);

  return (
    <div className="scanner-list">
      <div className="scanner-list-container">
        <div className="top-section">
          <button className="backBtn" onClick={() => navigate("/")}>
            <i class="fa-solid fa-arrow-left"></i>
          </button>
          <h2>Scanners found: {scanners.length}</h2>
        </div>

        <table>
          <tr>
            <th>Scanner Name</th>
            <th>IP Address</th>
            <th>Scanner Speed</th>
            <th>Status</th>
            <th></th>
          </tr>

          {scanners.map((sc, key) => {
            return (
              <tr key={key}>
                <td>{sc.scannerName}</td>
                <td>{sc.ipAddress}</td>
                <td>{sc.scannerSpeed}</td>
                <td>{sc.isAvailable}</td>
                <td>
                  <ConnectButton />
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
}

export default ScannerList;
