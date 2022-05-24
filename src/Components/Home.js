import React, { useState, useEffect } from "react";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { getAuth, signOut } from "firebase/auth";
import { db, storage } from "./Firebase.js";
import { doc, setDoc, collection, getDocs } from "firebase/firestore";
// import { Routes, Route } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import Snaplogo from '../Images/SNAPLOGO.png'
import "./home.css";
// import { saveAs } from 'file-saver';

function Home() {
  const location = useLocation();
  let navigate = useNavigate();
  const auth = getAuth();
  var [data, setData] = useState([]);

  const fun1 = async () => {
    var data1 = [];
    const querySnapshot = await getDocs(collection(db, location.state.email));
    querySnapshot.forEach((doc) => {
      data1.push(doc.data());
    });
    setData(data1);
  };
  useEffect(() => {
    fun1();
  }, []);

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

  // const downloadImage = (e) => {
  //   console.log(e);
  //   saveAs('asdfg', e)
  // }

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
        <h1 className="yourImages">Your Images</h1>
        {data.map((l) => (
          <div key={l.imageURL} className="images">
            <img
              src={l.imageURL}
              alt="Not found"
              className="imag"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;

// {/* 
// //       {data.map((l) => (
// //         <div key={l.imageURL} className="images">
// //           <img
// //             src={l.imageURL}
// //             alt="Not found"
// //             width="300"
// //             height="300"
// //             className="imag"
// //           />
// //         </div>
// //       ))} */}
