import React from 'react'
import { useState } from "react";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { db, storage } from './Firebase.js';
import { doc, setDoc } from "firebase/firestore";


function Home() {
  const [imgUrl, setImgUrl] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault()
    const file = e.target[0]?.files[0]
    if (!file) return;
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed",
      (snapshot) => {
        // const progress =
        //   Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        // setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
          setImgUrl(downloadURL)
          console.log(downloadURL);
          var imageurl = {
            imageURL: downloadURL
          }
          await setDoc(doc(db,"url",'name3'),imageurl);
       
        })
      }
    );
  }

  // const call = async () => {
  //   console.log("Success");
  //   var imageurl = {
  //     image: imgUrl
  //   }
  //   await setDoc(doc(db,"urls",'name2'),imageurl);
  // }

  return (
    <div>
      <form onSubmit={handleSubmit} className='form'>
        <input type='file' />
        <button type='submit'>Upload</button>
      </form>
      {
        imgUrl
      }
      {/* <button onClick={call}>Set</button> */}
    </div>
  )
}


export default Home