import React, { useState } from "react";
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import NavBar from "./Pages/Components/NavBar";
import Home from "./Pages/Home";
import GamePage from "./Pages/GamePage";
import About from "./Pages/About";
import Leaderboard from "./Pages/Leaderboard";
import './App.css';
import BikeGame from "./BikeGame/BikeGame";

function App() {
  const [showGame, setShowGame] = useState(false);

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:id" element={<GamePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>

      <div className="App">
            {/* Button to start the game */}
            <button onClick={() => setShowGame(true)} style={{ padding: "10px 20px", fontSize: "16px" }}>
                Start Game
            </button>

            {/* Render the game only if showGame is true */}
            {showGame && <BikeGame />}
      </div>
    </BrowserRouter>

  );
}

export default App;
