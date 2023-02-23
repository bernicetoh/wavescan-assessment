import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import InputPage from "./pages/InputPage";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<InputPage />} />
      </Routes>
    </div>
  );
}

export default App;
