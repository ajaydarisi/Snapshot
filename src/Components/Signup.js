import { React, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

function Signup() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
  const auth = getAuth();
  const Submit = () => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      // ..
    })
  }

  return (
  <div>
      Signup<br/>
      {/* <form onSubmit={onSubmit}> */}
        <input type="email" name="email" placeholder="Enter Email" onChange={(e)=>{setEmail(e.target.value)}} />        
        <input type="password" name="password" placeholder="Enter Password" onChange={(e)=>{setPassword(e.target.value)}} />
        <button onClick={Submit}>Submit</button>
      {/* </form> */}
  </div>
  );
}

export default Signup;
