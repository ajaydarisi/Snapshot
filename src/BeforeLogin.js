import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./Components/Signup.js";
import Login from "./Components/Login.js";
import NoPath from "./Components/NoPath.js";
import Register from "./Components/Register.js";

function BeforeLogin() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/confidential" element={<Signup />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NoPath />} />
      </Routes>
    </div>
  );
}

export default BeforeLogin;
