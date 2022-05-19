import "./App.css";
import Home from "./Components/Home.js";
import { Routes, Route } from "react-router-dom";
import Signup from "./Components/Signup.js";
import Login from "./Components/Login.js";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}
export default App;
