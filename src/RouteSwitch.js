import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import InputPage from "./pages/InputPage";
import ViewPage from "./pages/ViewPage";

function RouteSwitch() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<InputPage />} />
        <Route path="/view" element={<ViewPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RouteSwitch;
