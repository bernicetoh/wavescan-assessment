import React, { useState } from "react";
import "./ConnectButton.css";
function ConnectButton() {
  const [isConnected, setIsConnected] = useState(false);
  const toggleBtn = () => {
    if (isConnected) {
      setIsConnected(false);
    } else {
      setIsConnected(true);
    }
  };
  return (
    <button
      className={"button" && isConnected}
      onClick={toggleBtn}
      style={
        isConnected
          ? { backgroundColor: "#081464", border: "0.3px solid white" }
          : { backgroundColor: "grey" }
      }
    >
      {isConnected ? "disconnect" : "connect"}
    </button>
  );
}

export default ConnectButton;
