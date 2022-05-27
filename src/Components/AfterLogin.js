import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home.js";
import Expand from "./Expand.js";
import Nav from "./Nav.js";
import "./home.css";
import Redirect from "./Redirect.js";

function AfterLogin() {
  return (
    <div className="home">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/expand" element={<Expand />} />
        <Route path="/*" element={<Redirect />} />
      </Routes>
    </div>
  );
}

export default AfterLogin;
