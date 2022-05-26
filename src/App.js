import { useAuth } from "./Components/Firebase.js";
import BeforeLogin from "./BeforeLogin.js";
import AfterLogin from "./AfterLogin.js";
import "./App.css";

function App() {
  //For checking Current User
  const currentUser = useAuth();
  return (
    <div className="App">{currentUser ? <AfterLogin /> : <BeforeLogin />}</div>
  );
}
export default App;
