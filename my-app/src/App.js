/*
    Ishaan Agarwal
    1/28/2025

    App.js is the central launching page for the Game Ducky website. It embeds the TopNavBar 
    component and uses the Routes and Route components to navigate between pages. The website
    also includes all the games
*/

import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import TopNavBar from "./Pages/Components/NavBar";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Leaderboard from "./Pages/Leaderboard";
import BikeGamePage from "./Pages/BikeGamePage";
import DuckSweeperPage from "./Pages/DuckSweeperPage";
import WordDuckPage from "./Pages/WordDuckPage";
import './App.css';

function App() {
  const [showGame, setShowGame] = useState(false);
  {/* Navigation bar to navigate through the website */}
  return (
      <>
      <TopNavBar />
      <div className="content-container">
        <Routes>  
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/bikegamepage" element={<BikeGamePage />} />
            <Route path="/ducksweeperpage" element={<DuckSweeperPage />} />
            <Route path="/wordduckpage" element={<WordDuckPage />} />
        </Routes>
      </div>
      </>

  );
}

export default App;
