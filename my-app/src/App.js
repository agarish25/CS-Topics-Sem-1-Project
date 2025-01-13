import React from "react";
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import NavBar from "./Pages/Components/NavBar";
import Home from "./Pages/Home";
import GamePage from "./Pages/GamePage";
import About from "./Pages/About";
import Leaderboard from "./Pages/Leaderboard";
import './App.css';
import BikeGame from "./BikeGame";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <BikeGame />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:id" element={<GamePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
        
    </BrowserRouter>
  );
}

export default App;
