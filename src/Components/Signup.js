import { React, useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "./Firebase.js";
import { doc, setDoc } from "firebase/firestore";
import { Link } from 'react-router-dom';
import Logo from "../Images/SNAPLOGO.png";
import Icon from "../Images/Icon.png";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();
  const Submit = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async(userCredential) => {
        // Signed in
        const user = userCredential.user;
        await setDoc(doc(db, email,'credentials'), {name:name,email:email,password:password});
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        // ..
      });
  };

  return (
    <div className="main">
      <div className="leftDiv">
        <div className="leftInner">
          <div className="title">
            <div className="image">
              <img src={Icon} alt="Icon" width="150" height="150" />
            </div>
            <div className="titleInner">
              <div className="welcome">
                <h1>Welcome to</h1>
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
            />
            <br />
            <button className="submit" onClick={Submit}>
              <span className="login">Register</span>
            </button>
            <p>
              Existing User? 
              <Link to='/'><span className="register"> Login</span></Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
