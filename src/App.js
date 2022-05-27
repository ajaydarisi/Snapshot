import { useAuth } from "./Components/Firebase.js";
import BeforeLogin from "./Components/BeforeLogin.js";
import AfterLogin from "./Components/AfterLogin.js";
import "./App.css";

function App() {
  const currentUser = useAuth();
  return (
    <div className="App">{currentUser ? <AfterLogin /> : <BeforeLogin />}</div>
  );
}
export default App;
