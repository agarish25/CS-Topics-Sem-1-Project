import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Home from "./Pages/Home";
import GamePage from "./Pages/GamePage";
import About from "./Pages/About";
import Leaderboard from "./Pages/About";
import './App.css';

function App() {
  return (
    <Router>
      <NavBar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:id" element={<GamePage />} />
        <Route path="about" element={<About />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
        
    </Router>
  );
}

export default App;
