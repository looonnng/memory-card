import './App.css';
import { useState, useEffect } from 'react';
import fetchData from './fetchData';

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [topAlbums, setTopAlbums] = useState([]);
  const [guess, setGuess] = useState([]);
  const [isGameStart, setIsGameStart] = useState(false);
  const isGameWon = guess.length > 0 && guess.length === topAlbums.length;

  useEffect(() => {
    fetchData().then((result) => setTopAlbums(result));
  }, []);

  const albumElements = topAlbums.slice(0, 10).map((album) => (
    <button
      key={album.name}
      className="album"
      onClick={() => handleClick(album.name)}
    >
      <img src={album.image[3]['#text']} alt={album.name} />
    </button>
  ));

  function handleClick(albumName) {
    if (guess.includes(albumName)) {
      setScore(0);
      setGuess([]);
      shuffleAlbums(topAlbums);
      setIsGameStart(false);
      alert('you lost!');
      return;
    }
    if (score >= bestScore) {
      setBestScore((prevBestScore) => prevBestScore + 1);
    }

    setScore((prevScore) => prevScore + 1);
    setGuess((prevGuess) => [...prevGuess, albumName]);
    shuffleAlbums(topAlbums);
  }

  function shuffleAlbums(albums) {
    let copyAlbums = albums.slice(0);
    for (let i = albums.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copyAlbums[i], copyAlbums[j]] = [copyAlbums[j], copyAlbums[i]];
    }
    setTopAlbums(copyAlbums);
  }

  function handleNewGame() {
    setIsGameStart((previous) => !previous);
  }

  function handleGameWon() {
    alert('You Won!');
    setScore(0);
    setGuess([]);
    setIsGameStart(false);
  }

  return (
    <main className="wrapper">
      <h1>
        King Gizzard and The Lizard Wizard<br></br>Memory Game
      </h1>
      <h2>
        Score: {score} <span>Best Score: {bestScore}</span>
      </h2>
      {isGameStart && score == 0 && (
        <p>Click on each album once to score points!</p>
      )}
      {!isGameStart && (
        <button onClick={handleNewGame} className="new-game">
          New Game
        </button>
      )}
      {isGameStart && (
        <section className="albums-container">{albumElements}</section>
      )}
      {isGameWon && handleGameWon()}
    </main>
  );
}

export default App;
