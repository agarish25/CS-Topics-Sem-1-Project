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
import BikeGame from "./BikeGame/BikeGame";

function App() {
  const [showGame, setShowGame] = useState(false);

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

        {/* <div className="App">
              Button to start the game */}
              {/* <button onClick={() => setShowGame(true)} style={{ padding: "10px 20px", fontSize: "16px" }}>
                  Start Game
              </button> */}

              {/* Render the game only if showGame is true */}
              {/*showGame && <BikeGame />*/}
        {/* </div> */}
      </div>
      </>

  );
}

export default App;
