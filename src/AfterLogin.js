import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home.js";
import Expand from "./Components/Expand.js";


function AfterLogin() {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/expand" element={<Expand />} />
        </Routes>
    </div>
  )
}

export default AfterLogin