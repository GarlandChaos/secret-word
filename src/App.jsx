import { useState } from "react";

//Styles
import "./App.css";

//Javascript utils
import { arrayIncludes } from "./js/ArrayUtils.js";

//External data
import { words } from "./js/Words.js";
import { GameStateList } from "./js/GameStates.js";

//Components
import MenuView from "./components/MenuView.jsx";
import GameView from "./components/GameView.jsx";
import GameWinView from "./components/GameWinView.jsx";
import GameOverView from "./components/GameOverView.jsx";

function App() {
  //React states
  const [score, setScore] = useState(0);
  const [tryCount, setTryCount] = useState(3);
  const [selectedWord, setSelectedWord] = useState({});
  const [gameState, setGameState] = useState(GameStateList[0]);
  const [correctLetters, setCorrectLettersArray] = useState([]);
  const [wrongLetters, setWrongLettersArray] = useState([]);

  //Game state change check
  if (gameState === GameStateList[1]) {
    //Checks when rendering if game is over
    if (tryCount <= 0) {
      setGameState(GameStateList[3]);
      setTryCount(3);
    }

    //Check when rendering if game is won
    let gameWon = true;
    for (let i = 0; i < selectedWord.word.length; i++) {
      console.log(selectedWord.word[i]);
      if (!arrayIncludes(correctLetters, selectedWord.word[i])) {
        gameWon = false;
        break;
      }
    }

    if (gameWon) {
      setScore(score + 10);
      setGameState(GameStateList[2]);
    }
  }

  const selectRandomWord = () => {
    const index = Math.floor(Math.random() * words.length);
    setSelectedWord(words[index]);
  };

  const addToCorrectLetters = (letter) => {
    setCorrectLettersArray((previousCorrectLettersArray) => {
      if (arrayIncludes(previousCorrectLettersArray, letter))
        return previousCorrectLettersArray;

      return [...previousCorrectLettersArray, letter];
    });
  };

  const addToWrongLetters = (letter) => {
    setWrongLettersArray((prevWrongLettersArray) => {
      if (arrayIncludes(prevWrongLettersArray, letter))
        return prevWrongLettersArray;

      return [...prevWrongLettersArray, letter];
    });
  };

  const onWrongLetter = (letter) => {
    addToWrongLetters(letter);
    setTryCount(tryCount - 1);
  };

  const startGame = (keepScore = false) => {
    setCorrectLettersArray([]);
    setWrongLettersArray([]);
    selectRandomWord();
    if (!keepScore) {
      setScore(0);
    }
    setGameState(GameStateList[1]);
  };

  return (
    <>
      {/* menu */}
      {gameState === GameStateList[0] && (
        <MenuView startGameFunction={startGame} />
      )}

      {/* game */}
      {gameState === GameStateList[1] && (
        <GameView
          word={selectedWord.word}
          tip={selectedWord.tip}
          tryCount={tryCount}
          correctLetters={correctLetters}
          wrongLetters={wrongLetters}
          correctLetterFunction={addToCorrectLetters}
          wrongLetterFunction={onWrongLetter}
        />
      )}

      {/* gameWin */}
      {gameState === GameStateList[2] && (
        <GameWinView score={score} nextWordFuncion={startGame} />
      )}

      {/* gameOver*/}
      {gameState === GameStateList[3] && (
        <GameOverView
          score={score}
          restartGameFunction={() => startGame(false)}
        />
      )}
    </>
  );
}

export default App;
