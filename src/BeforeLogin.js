import React from 'react';
import { Routes, Route } from "react-router-dom";
import Signup from "./Components/Signup.js";
import Login from "./Components/Login.js";
import NoPath from "./Components/NoPath.js";


function BeforeLogin() {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<NoPath />} />
        </Routes>
    </div>
  )
}

export default BeforeLogin