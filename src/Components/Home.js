import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ref, deleteObject } from "firebase/storage";
import { db, storage } from "./Firebase.js";
import { collection, getDocs } from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";
import "./home.css";
import { useAuth } from "./Firebase.js";

function Home() {
  const currentUser = useAuth();
  let navigate = useNavigate();
  var [data, setData] = useState([]);
  var [files, setFiles] = useState(0);
  var [name, setName] = useState("User");
  const [deleteMsg,setDeleteMsg] = useState("Delete All");

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

  const deleteAll = () => {
    if(data.length) {
      if(window.confirm("Do you want to delete all the files")) {
        setDeleteMsg("Deleting");
        for(let i = 0; i < data.length; i++) {
          deleteimage(data[i].filename);
        }
      }
      fun1();
    }
    setDeleteMsg("Delete All");
  }

  const deleteimage = (filename) => {
    const desertRef = ref(
      storage,
      `${currentUser.email}/${filename}`
    );

    // Delete the file
    deleteObject(desertRef)
      .then(async () => {
        await deleteDoc(doc(db, currentUser.email, filename));
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="rightdiv">
      <div className="header">
        <h1 className="yourImages">{files ? "Your Images" : "No Images"}</h1>
        <button className="delete1" onClick={deleteAll}>
          {deleteMsg}
        </button>
      </div>
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
  );
}

export default Home;
