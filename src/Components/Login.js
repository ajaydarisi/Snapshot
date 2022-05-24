import { React, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
// import login from '../Images/login.png';
import { Link } from "react-router-dom";
import "./login.css";
import Logo from "../Images/SNAPLOGO.png";
import Icon from "../Images/Icon.png";

function Login() {
  let navigate = useNavigate();
  const [err, seterr] = useState("");
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Submit = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("Success", user);
        setEmail("");
        setPassword("");
        navigate("/home", { state: { email: email} });
        // ...
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        seterr({ err: error.code });
        console.log(err);
      });
  };

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      Submit();
    }
  };

  return (
    <div className="main">
      <div className="leftDiv">
        <div className="leftInner">
          <div className="title">
            <div className="image">
              <img
                src={Icon}
                alt="Icon"
                width="150"
                height="150"
                className="icon"
              />
            </div>
            <div className="titleInner">
              <div className="welcome">
                <h1>Welcome to</h1>
              </div>
              <div>
                <h1 className="snapshots">Snapshots</h1>
              </div>
            </div>
          </div>
          <div className="caption">
            <h1>Upload your Best Snaps here!</h1>
          </div>
        </div>
      </div>
      <div className="rightDiv">
        <div className="rightInner">
          <div className="logo">
            <img
              src={Logo}
              alt="Logo"
              width="90"
              height="90"
              className="snaplogo"
            />
            <p>Login to Upload</p>
          </div>
          <div className="credentials">
            <input
              type="text"
              name="name"
              className="in1"
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <br />
            <input
              type="password"
              name="name"
              className="in1"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              onKeyPress={handleKeypress}
            />
            <br />
            <button className="submit" onClick={Submit}>
              <span className="login">Login</span>
            </button>
            <p>
              New User?
              <Link to="/signup">
                <span className="register"> Register</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
