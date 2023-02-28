import React from "react";
import "./main.css";
import Logo from "../components/Logo";
import { useNavigate } from "react-router-dom";
import ScannerList from "../components/ScannerList";
import "./ViewPage.css";

function ViewPage() {
  const navigate = useNavigate();
  return (
    <div className="viewpage">
      <Logo />
      <ScannerList navigate={navigate} />
    </div>
  );
}

export default ViewPage;
