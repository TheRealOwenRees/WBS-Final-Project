import "./App.scss";
import Welcome from "./components/Welcome.jsx";
import Start from "./components/Start";
import Login from "./components/Login";
import About from "./components/About";
import { Link, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/start" element={<Start />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
