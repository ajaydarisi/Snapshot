import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { getAuth, signOut } from "firebase/auth";
import { db, storage } from "./Firebase.js";
import { doc, setDoc } from "firebase/firestore";
import Snaplogo from "../Images/SNAPLOGO.png";
import saveAs from "file-saver";
import "./expand.css";
import "./home.css";

function Expand() {
  let navigate = useNavigate();
  const location = useLocation();
  const auth = getAuth();
  const [progresspercent, setProgresspercent] = useState(0);
  const handleSubmit = (e) => {
    const file = e.target.files[0];
    var date =
      file.lastModifiedDate.getDate() +
      "-" +
      file.lastModifiedDate.getMonth() +
      "-" +
      (Number(file.lastModifiedDate.getYear()) + 1900);

    if (!file) return;

    const storageRef = ref(storage, `${location.state.email}/${file.name}`);
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
          var imageurl = {
            imageURL: downloadURL,
            filename: file.name,
            date: date,
          };
          await setDoc(doc(db, location.state.email, file.name), imageurl);
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

  const save = () => {
    saveAs(location.state.imageURL, "download");
  };

  const goBack = () => {
    navigate("/home", { state: { email: location.state.email } });
  };
  try {
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
                <h1 className="name">{location.state.name}</h1>
                <p className="files">
                  <span className="count">{location.state.files}</span> files
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
                      console.log(event);
                      handleSubmit(event);
                    }}
                  />
                  <span className="uptext">UPLOAD</span>
                  <span className="uplogo">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M384 352v64c0 17.67-14.33 32-32 32H96c-17.67 0-32-14.33-32-32v-64c0-17.67-14.33-32-32-32s-32 14.33-32 32v64c0 53.02 42.98 96 96 96h256c53.02 0 96-42.98 96-96v-64c0-17.67-14.33-32-32-32S384 334.3 384 352zM201.4 9.375l-128 128c-12.51 12.51-12.49 32.76 0 45.25c12.5 12.5 32.75 12.5 45.25 0L192 109.3V320c0 17.69 14.31 32 32 32s32-14.31 32-32V109.3l73.38 73.38c12.5 12.5 32.75 12.5 45.25 0s12.5-32.75 0-45.25l-128-128C234.1-3.125 213.9-3.125 201.4 9.375z" />
                    </svg>
                  </span>
                </label>
              </div>
              <div className="Progress">
                {progresspercent}% <span className="uploaded">Uploaded</span>
              </div>
            </div>
          </div>
          <div className="arranging"></div>
          <div className="logout" onClick={signout}>
            Logout
          </div>
        </div>
        <div className="rightdiv">
          <div className="details">
            <div className="detailsInner">
              <div className="datediv">
                <span className="date">Date: {location.state.date1}</span>
              </div>
              <div className="filenamediv">
                <span className="filename">{location.state.filename}</span>
              </div>
            </div>
            <div className="download">
              <svg
                className="downloadicon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
                onClick={save}
              >
                <path d="M144 480C64.47 480 0 415.5 0 336C0 273.2 40.17 219.8 96.2 200.1C96.07 197.4 96 194.7 96 192C96 103.6 167.6 32 256 32C315.3 32 367 64.25 394.7 112.2C409.9 101.1 428.3 96 448 96C501 96 544 138.1 544 192C544 204.2 541.7 215.8 537.6 226.6C596 238.4 640 290.1 640 352C640 422.7 582.7 480 512 480H144zM303 392.1C312.4 402.3 327.6 402.3 336.1 392.1L416.1 312.1C426.3 303.6 426.3 288.4 416.1 279C407.6 269.7 392.4 269.7 383 279L344 318.1V184C344 170.7 333.3 160 320 160C306.7 160 296 170.7 296 184V318.1L256.1 279C247.6 269.7 232.4 269.7 223 279C213.7 288.4 213.7 303.6 223 312.1L303 392.1z" />
              </svg>
            </div>
          </div>
          <div className="bigimage">
            <img
              className="Img"
              src={location.state.imageURL}
              alt="Not found"
              onClick={goBack}
            />
          </div>
        </div>
      </div>
    );
  } catch (e) {
    signout();
  }
}

export default Expand;
