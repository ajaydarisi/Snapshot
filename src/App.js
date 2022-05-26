import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "./Components/Firebase.js";
import BeforeLogin from "./BeforeLogin.js";
import AfterLogin from "./AfterLogin.js";

function App() {
  //For checking Current User
  const currentUser = useAuth();
  return (
    <div className="App">
        {currentUser?<AfterLogin />:<BeforeLogin />}
    </div>
  );
}
export default App;
