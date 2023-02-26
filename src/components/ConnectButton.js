import React, { useState } from "react";
import "./ConnectButton.css";

function ConnectButton({ isAvailable }) {
  const [isAvail, setIsAvail] = useState(isAvailable);

  const toggleBtn = () => {
    if (isAvail) {
      setIsAvail(false);
    } else {
      setIsAvail(true);
    }

    console.log("toggle");
  };
  return (
    <button
      className={"button"}
      onClick={toggleBtn}
      style={
        isAvail
          ? { backgroundColor: "#081464", border: "0.3px solid white" }
          : { backgroundColor: "grey" }
      }
    >
      connect
    </button>
  );
}

export default ConnectButton;
