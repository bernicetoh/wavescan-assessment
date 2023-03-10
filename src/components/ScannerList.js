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
        console.log(scanners);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="scanner-list">
      <div className="scanner-list-container">
        <div className="top-section">
          <button className="backBtn" onClick={() => navigate("/")}>
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <h2>Scanners found: {scanners.length}</h2>
        </div>

        <table>
          <thead className="header">
            <tr>
              <th>Scanner Name</th>
              <th className="ipaddress">IP Address</th>
              <th>Scanner Speed</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {scanners.map((sc, key) => {
              console.log(scanners);
              console.log(sc.isAvailable);
              return (
                <tr key={key}>
                  <td>{sc.scannerName}</td>
                  <td>{sc.ipAddress}</td>
                  <td>{sc.scannerSpeed}</td>
                  <td>{sc.isAvailable === "true" ? "Available" : "Engaged"}</td>
                  <td>
                    <ConnectButton isAvailable={sc.isAvailable === "true"} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ScannerList;
