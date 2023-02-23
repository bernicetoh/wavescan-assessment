import React from "react";
import Logo from "../components/Logo";
import Form from "../components/Form";
import "./main.css";
import "./InputPage.css";
import { useNavigate } from "react-router-dom";

function InputPage() {
  const navigate = useNavigate();
  return (
    <div className="inputpage">
      <Logo />
      <Form navigate={navigate} />
    </div>
  );
}

export default InputPage;
