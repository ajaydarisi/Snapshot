import "./App.css";
import Home from "./Components/Home.js";
import { Routes, Route } from "react-router-dom";
import Signup from "./Components/Signup.js";
import Login from "./Components/Login.js";
import Expand from "./Components/Expand.js";
import NoPath from "./Components/NoPath.js";
import { useAuth } from "./Components/Firebase.js";

function App() {
  //For checking Current User
  const currentUser = useAuth();
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* Works only when user is logged in */}
        {currentUser && <Route path="/home" element={<Home />} />}
        {currentUser && <Route path="/expand" element={<Expand />} />}
        <Route path="*" element={<NoPath />} />
      </Routes>
    </div>
  );
}
export default App;
