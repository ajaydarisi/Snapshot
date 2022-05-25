import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db, storage } from "./Firebase.js";
import { getAuth, signOut } from "firebase/auth";
import { doc, setDoc, collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import Snaplogo from "../Images/SNAPLOGO.png";
import "./home.css";
import { useAuth } from "./Firebase.js";

function Home() {
  const auth = getAuth();
  const currentUser = useAuth();
  let navigate = useNavigate();
  var [data, setData] = useState([]);
  var [files, setFiles] = useState(0);
  var [name, setName] = useState("User");
  const [progresspercent, setProgresspercent] = useState(0);

  const fun1 = async () => {
    var data1 = [];
    const querySnapshot = await getDocs(collection(db, currentUser.email));
    setFiles(Number(querySnapshot.docs.length) - 1);
    querySnapshot.forEach((doc) => {
      if (doc.data().name) {
        setName(doc.data().name);
      }
      data1.push(doc.data());
    });
    setData(data1);
  };

  useEffect(() => {
    fun1();
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
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
        });
      }
    );
  };
  const signout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  const expand = (e) => {
    navigate("/expand", {
      state: {
        imageURL: e.target.src,
        email: currentUser.email,
        name: name,
        files: files,
        filename: e.target.alt,
        date1: e.target.id,
      },
    });
  };

  return (
    <div className="home">
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
              <h1 className="name">{name}</h1>
              <p className="files">
                <span className="count">{files}</span> files
              </p>
            </div>
            <div className="extra">
              <label className="upload">
                <input
                  className="upfile"
                  type="file"
                  accept="image/*"
                  placeholder="Upload"
                  onChange={(event) => {
                    handleSubmit(event);
                  }}
                />
                <span className="uptext">UPLOAD</span>
                <span className="uplogo">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M384 352v64c0 17.67-14.33 32-32 32H96c-17.67 0-32-14.33-32-32v-64c0-17.67-14.33-32-32-32s-32 14.33-32 32v64c0 53.02 42.98 96 96 96h256c53.02 0 96-42.98 96-96v-64c0-17.67-14.33-32-32-32S384 334.3 384 352zM201.4 9.375l-128 128c-12.51 12.51-12.49 32.76 0 45.25c12.5 12.5 32.75 12.5 45.25 0L192 109.3V320c0 17.69 14.31 32 32 32s32-14.31 32-32V109.3l73.38 73.38c12.5 12.5 32.75 12.5 45.25 0s12.5-32.75 0-45.25l-128-128C234.1-3.125 213.9-3.125 201.4 9.375z" />
                  </svg>
                </span>
              </label>
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
      <div className="rightdiv">
        <h1 className="yourImages">{files ? "Your Images" : "No Images"}</h1>
        <div className="cards">
          {data.map((l) =>
            l.imageURL ? (
              <div key={l.imageURL} className="images">
                <img
                  src={l.imageURL}
                  alt={l.filename}
                  id={l.date}
                  className="imag"
                  onClick={expand}
                />
              </div>
            ) : (
              <></>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
