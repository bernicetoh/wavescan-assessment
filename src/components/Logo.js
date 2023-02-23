import React from "react";
import "./Logo.css";

function Logo() {
  return (
    <div className="logo-container">
      <a
        href="https://www.wavescan.sg/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="img-container">
          <img
            src={require("../images/wavescan-logo.png")}
            alt="wavescan logo"
            className="logo-img"
          />
        </div>
      </a>
    </div>
  );
}

export default Logo;
