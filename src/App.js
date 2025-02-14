import "./App.css";
import Navbar from "./components/Navbar";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Alert from "./components/Alert";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AskAi from "./components/AskAi";
import About from "./components/About";

export default function App() {
  
  const [mode, setmode] = useState("light");
  const [alert, setalert] = useState(null);
  const showAlert = (message, type) => {
  setalert({
    msg: message,
    type: type,
  });
  setTimeout(() => {
    setalert(null);
  }, 1800); 
  };

  const togglemode = () => {
  if (mode === "light") {
    setmode("dark");

    document.body.style.backgroundColor = "#347474";
    document.body.style.color = "white";
  } else {
    setmode("light");

    document.body.style.backgroundColor = "#ddeedf";
    document.body.style.color = "black";
  }
  };

  useEffect(() => {
  // Set initial mode to light when the component mounts
  setmode("light");
  document.body.style.backgroundColor = "#ddeedf";
  document.body.style.color = "black";
  }, []);

  return (
    <Router>
    <Navbar
      mode={mode}
      togglemode={togglemode}
      theme={mode === "light" ? "Light" : "Dark"}
      showAlert={showAlert}
    />
    <Alert alert={alert} />
    <div className="container my-5">
      <Routes>
      <Route exact path="/about" element={<About />} />
      <Route exact path="/login" element={<Login showAlert={showAlert} />} />
      <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
      <Route exact path="/" element={<Landing />} />
      <Route exact path="/askai" element={<AskAi showAlert={showAlert}/>} />
      </Routes>
    </div>
    </Router>
  );
}
