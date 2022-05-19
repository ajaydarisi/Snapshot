// import './App.css';
// import Upload from './Components/Upload.js'

// function App() {
//   return (
//     <div className="App">
//       <Upload />
//     </div>
//   );
// }

// export default App;

import './App.css';
import Home from './Components/Home.js';
import { Routes, Route } from "react-router-dom";
import Images from './Components/Images.js';
import Signup from './Components/Signup.js';
import Login from './Components/Login.js';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Login/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/signup" element={<Signup/>} />
        {/* <Route path="/" element={<Login/>} /> */}
        <Route path="/images" element={<Images/>} />
      </Routes>
    </div>
  );
}
export default App;