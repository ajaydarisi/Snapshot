import React, { useState, useEffect } from "react";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "./Firebase.js";
import { doc, setDoc, collection, getDocs } from "firebase/firestore";
import { useLocation } from "react-router-dom";
// import { saveAs } from 'file-saver';


function Home() {
  const location = useLocation();
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
    e.preventDefault();
    const file = e.target[0]?.files[0];
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

  // const downloadImage = (e) => {
  //   console.log(e);
  //   saveAs('asdfg', e) 
  // }

  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <input type="file" />
        <button type="submit">Upload</button>
      </form>
      {data.map((l) => (
        <div key={l.imageURL}>
          <img src={l.imageURL} alt="Not found" width="300" height="300" />
        </div>
      ))}
    </div>
  );
}

export default Home;

{/* <button onClick={downloadImage(l.imageURL)}>Download!</button> */}