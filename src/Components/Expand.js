import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Snaplogo from '../Images/SNAPLOGO.png';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { getAuth, signOut } from "firebase/auth";
import { db, storage } from "./Firebase.js";
import { doc, setDoc} from "firebase/firestore";
import download from '../Images/download.png'
import saveAs from 'file-saver';
import './expand.css';


function Expand() {
  const location = useLocation();
  let navigate = useNavigate();
  const auth = getAuth();
  const handleSubmit = (e) => {
    // e.preventDefault();
    const file = e.target.files[0];
    console.log(file);
    if (!file) return;
    console.log(location.state.email);
    const storageRef = ref(storage, `${location.state.email}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // const progress =
        //   Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        // setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log(downloadURL);
          var imageurl = {
            imageURL: downloadURL,
          };
          await setDoc(doc(db, location.state.email, file.name), imageurl);
        });
      }
    );
  };
  const signout = () => {
    signOut(auth).then(() => {
        // Sign-out successful.
        navigate("/");
      }).catch((error) => {
        // An error happened.
      });
}
const save = () => {
    saveAs(location.state.imageURL,'download');
}
  const goBack = () => {
    navigate("/home",{ state: {email:location.state.email}});
  }
  return (
    <div className="home">
      <div className="nav">
        <div className="heading">
          <div className="headingInner">
            <div className="snaplogo">
              <img
                src={Snaplogo}
                alt="Icon"
                className="icon"
                width="100"
                height="100"
              />
            </div>
            <div className="text" >
              <h1 className="name">Ajay Darisi</h1>
              <p className="files"><span className="count">1234</span> files</p> 
            </div>
            <div className="">
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
              UPLOAD
           </label>
           </div>
          </div>
        </div>
        <div className="arranging">
          
        </div>
        <div className="logout" onClick={signout}>
            Logout 
        </div>
      </div>
      <div className="cards">
            <div className="details">
                <div className="detailsInner">
                  <div className="datediv">
                    <span className="date">2022-03-04</span>
                  </div>
                  <div className="filenamediv">
                    <span className="filename">Photo</span>
                  </div>
                </div>
                <div className="download">
                  <img src={download} alt="Download" width="50" height="50" onClick={save} />
                </div>
            </div>
            <div className="bigimage">
              <img className="Img" src={location.state.imageURL} alt="Not found" onClick={goBack} />
            </div>
      </div>
    </div>
  )
}

export default Expand;