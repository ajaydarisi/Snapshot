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
import Images from './Components/Images.js'

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Images/>} />
        <Route path="/home" element={<Home/>} />
      </Routes>
    </div>
  );
}
export default App;