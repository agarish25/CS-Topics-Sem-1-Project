import Reach from "react";
import { Link } from "react-router-dom";

const games = [
    { id: "1", name: "Bike Game", description:"Google Snake but better", thumbail:""},
    { id: "2", name: "Ducksweeper", description:"Minesweeper but better", thumbail:""},
    { id: "3", name: "Word Duck", description:"Word Hunt but better", thumbail:""}
]

const Home = () => {
    return (
        <div className="home">
            <h1>Welcome to GameDucky!</h1>
            <div className="Game-Grid">
                {games.map((game) => (
                    <div key={game.id} className="game-card">
                        <img src={game.thumbnail} alt={game.name} className="thumbnail" />
                        <h2>{game.name}</h2>
                        <p>{game.description}</p>
                        <Link to={`/game/${game.id}`}>Play Now!</Link>
                    </div>
                ))}
            </div>
        </div>
    )
}