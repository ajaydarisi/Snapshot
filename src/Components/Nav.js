import React, { useState, useEffect } from "react";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import Snaplogo from "../Images/SNAPLOGO.png";
import { db, storage } from "./Firebase.js";
import { getAuth, signOut } from "firebase/auth";
import {
  doc,
  setDoc,
  collection,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useAuth } from "./Firebase.js";
import "./home.css";

function Nav() {
  const auth = getAuth();
  let navigate = useNavigate();
  const currentUser = useAuth();
  var [files, setFiles] = useState(0);
  var [name, setName] = useState("User");
  const [progresspercent, setProgresspercent] = useState(0);

  const fun1 = async () => {
    const querySnapshot = await getDocs(collection(db, currentUser.email));
    setFiles(Number(querySnapshot.docs.length) - 1);
    querySnapshot.forEach((doc) => {
      if (doc.data().name) {
        setName(doc.data().name);
      }
    });
  };

  useEffect(() => {
    fun1();
  });

  const uploadSnaps = (e) => {
      e.preventDefault();
      for(let i=0;i<e.target.files.length;i++) {
        var imageFile = e.target.files[i];
        handleSubmit(imageFile);
      }
  }

  const handleSubmit = (file) => {
    var date =
      file.lastModifiedDate.getDate() +
      "-" +
      file.lastModifiedDate.getMonth() +
      "-" +
      (Number(file.lastModifiedDate.getYear()) + 1900);
    if (!file) return;
    const storageRef = ref(storage, `${currentUser.email}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log(downloadURL);
          var imageurl = {
            imageURL: downloadURL,
            filename: file.name,
            date: date,
          };
          await setDoc(doc(db, currentUser.email, file.name), imageurl);
          fun1();
        });
      }
    );
  };

  const changeName = async () => {
    const result = prompt("Change your name");
    if (result) {
      const washingtonRef = doc(db, currentUser.email, "credentials");
      await updateDoc(washingtonRef, {
        name: result,
      });
      fun1();
    }
  };

  const signout = () => {
    console.log("Signout");
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
        console.log(currentUser);
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  return (
    <div className="nav">
      <div className="heading">
        <div className="headingInner">
          <div className="snaplogo1">
            <img
              src={Snaplogo}
              alt="Icon"
              className="icon"
              width="100"
              height="100"
            />
          </div>
          <div className="text">
            <div>
              <h1 className="name" onClick={changeName}>
                {name}
              </h1>
            </div>
            <div>
              {" "}
              <p className="files">
                <span className="files count">{files}</span> files
              </p>
            </div>
          </div>
          <div className="extra">
            <div className="upload">
              <label className="">
                <input
                  className="upfile"
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    uploadSnaps(event);
                  }}
                multiple
                />
                <span className="uptext">UPLOAD</span>
                <span className="uplogo">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M384 352v64c0 17.67-14.33 32-32 32H96c-17.67 0-32-14.33-32-32v-64c0-17.67-14.33-32-32-32s-32 14.33-32 32v64c0 53.02 42.98 96 96 96h256c53.02 0 96-42.98 96-96v-64c0-17.67-14.33-32-32-32S384 334.3 384 352zM201.4 9.375l-128 128c-12.51 12.51-12.49 32.76 0 45.25c12.5 12.5 32.75 12.5 45.25 0L192 109.3V320c0 17.69 14.31 32 32 32s32-14.31 32-32V109.3l73.38 73.38c12.5 12.5 32.75 12.5 45.25 0s12.5-32.75 0-45.25l-128-128C234.1-3.125 213.9-3.125 201.4 9.375z" />
                  </svg>
                </span>
              </label>
            </div>
          </div>
          <div className="Progress">
            {progresspercent}%&nbsp;<span className="uploaded">Uploaded</span>
          </div>
        </div>
      </div>
      <div className="arranging"></div>
      <div className="logout" onClick={signout}>
        Logout
      </div>
    </div>
  );
}

export default Nav;
