import React, { useState, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from './Firebase.js'

function Images() {

    var [data,setData] = useState([]);

    const fun = async() => {
        var data1 = [];
        const querySnapshot = await getDocs(collection(db, "urls"));
        querySnapshot.forEach((doc) => {
            data1.push(doc.data());
        });
        setData(data1);
    }
    useEffect( () => {
        fun();
      },[]);

  return (
    <div>
        {data.map((l) => (
                <div key={l.imageURL}>  
                        <img src={l.imageURL} alt="Not found" width="300" height="300"/>
                </div>
            ))}
    </div>
  )
}

export default Images