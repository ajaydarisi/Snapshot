// import { useState } from "react";
// import { storage } from "./Firebase.js";
// import { ref, getDownloadURL, uploadBytesResumable} from "firebase/storage";

// import React from 'react'

// function Upload() {
//     const [imgUrl, setImgUrl] = useState(null);
//     const [progresspercent, setProgresspercent] = useState(0);

//     const handleSubmit = (e) => {
//         e.preventDefault()
//         const file = e.target[0]?.files[0]

//         if (!file) return;

//         const storageRef = ref(storage, `files/${file.name}`);
//         const uploadTask = uploadBytesResumable(storageRef, file);

//         uploadTask.on("state_changed",
//         (snapshot) => {
//             const progress =
//             Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
//             setProgresspercent(progress);
//         },
//         (error) => {
//             alert(error);
//         },
//         () => {
//             getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//             setImgUrl(downloadURL)
//             });
//         }
//         );
//     }
//   return (
//     <>
//         <form className='form'>
//             <input type='file' />
//             <button type='submit' onClick={handleSubmit}>Upload</button>
//         </form>
//     </>
//   )
// }

// export default Upload