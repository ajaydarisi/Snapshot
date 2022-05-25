import { React, useState } from "react";
import { db } from "./Firebase.js";
import { doc, setDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Logo from "../Images/SNAPLOGO.png";
import Icon from "../Images/Icon.png";
import "./login.css";

function Signup() {
  const auth = getAuth();
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("Enter Credentials");
  const Submit = () => {
    setMessage("Registering you...")
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        await setDoc(doc(db, email, "credentials"), {
          name: name,
          email: email,
          password: password,
        });
        console.log(user);
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setMessage(errorCode.split('/')[1])
        console.log(errorCode);
        console.log(errorMessage);
      });
  };

  const handleKeypress = (e) => {
    //Direct Submitting by pressing Enter key
    //It triggers by pressing the Enter key
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
            <p>Register to Upload</p>
          </div>
          <div className="credentials">
          <p>{message}</p>
            <input
              type="text"
              name="name"
              className="in1"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <input
              type="text"
              name="name"
              className="in1"
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <input
              type="password"
              name="name"
              className="in1"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeypress}
            />
            <br />
            <button className="submit" onClick={Submit}>
              <span className="login">Register</span>
            </button>
            <p>
              Existing User? &nbsp;
              <Link to="/">
                <span className="register">Login</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
