import { useState } from "react";

//Styles
import "./App.css";

//Javascript utils
import { ArrayIncludes } from "./js/ArrayUtils.js";

//Components
import GameView from "./components/GameView";
import GameOverView from "./components/GameOverView";
import GameWinView from "./components/GameWinView.jsx";

function App() {
  const gameStateList = ["menu", "game", "gameWin", "gameOver"];
  const words = [
    { word: "apple", tip: "fruit" },
    { word: "Ferrari", tip: "car" },
    { word: "tetris", tip: "videogame" },
  ];

  //React states
  const [score, setScore] = useState(0);
  const [tryCount, setTryCount] = useState(3);
  const [selectedWord, setSelectedWord] = useState({});
  const [gameState, setGameState] = useState("menu");
  const [correctLetters, setCorrectLettersArray] = useState([]);
  const [wrongLetters, setWrongLettersArray] = useState([]);

  if (gameState === gameStateList[1]) {
    //Checks when rendering if game is over
    if (tryCount <= 0) {
      setGameState(gameStateList[3]);
      setTryCount(3);
    }

    //Check when rendering if game is won
    let gameWon = true;
    for (let i = 0; i < selectedWord.word.length; i++) {
      console.log(selectedWord.word[i]);
      if (!ArrayIncludes(correctLetters, selectedWord.word[i])) {
        gameWon = false;
        break;
      }
    }

    if (gameWon) {
      setScore(score + 10);
      setGameState(gameStateList[2]);
    }
  }

  const SelectRandomWord = () => {
    const index = Math.floor(Math.random() * words.length);
    setSelectedWord(words[index]);
  };

  const AddToCorrectLetters = (letter) => {
    setCorrectLettersArray((previousCorrectLettersArray) => {
      if (ArrayIncludes(previousCorrectLettersArray, letter))
        return previousCorrectLettersArray;

      return [...previousCorrectLettersArray, letter];
    });
  };

  const AddToWrongLetters = (letter) => {
    setWrongLettersArray((prevWrongLettersArray) => {
      if (ArrayIncludes(prevWrongLettersArray, letter))
        return prevWrongLettersArray;

      return [...prevWrongLettersArray, letter];
    });
  };

  const StartGame = (keepScore = false) => {
    setCorrectLettersArray([]);
    setWrongLettersArray([]);
    SelectRandomWord();
    if (!keepScore) {
      setScore(0);
    }
    setGameState(gameStateList[1]);
  };

  const GameStateFunc = () => {
    if (gameState === gameStateList[0]) {
      //menu
      return (
        <>
          <h1>SECRET WORD</h1>
          <button onClick={StartGame}>Play</button>
        </>
      );
    } else if (gameState === gameStateList[1]) {
      //game
      return (
        <GameView
          word={selectedWord.word}
          tip={selectedWord.tip}
          tryCount={tryCount}
          correctLetters={correctLetters}
          wrongLetters={wrongLetters}
          correctLetterFunction={AddToCorrectLetters}
          wrongLetterFunction={() => {
            AddToWrongLetters;
            setTryCount(tryCount - 1);
          }}
        />
      );
    } else if (gameState === gameStateList[2]) {
      //gameWin
      return <GameWinView score={score} nextWordFuncion={StartGame} />;
    } else if (gameState === gameStateList[3]) {
      //gameOver
      return (
        <GameOverView
          score={score}
          restartGameFunction={() => StartGame(false)}
        />
      );
    }
  };

  // const Test = () => {
  //   const wordsArray = words.map((w) => (
  //     <GameView
  //       key={w.word}
  //       word={w.word}
  //       tip={w.tip}
  //       tryCount={tryCount}
  //       correctLetters={correctLetters}
  //       wrongLetters={wrongLetters}
  //       correctLetterFunction={AddToCorrectLetters}
  //       wrongLetterFunction={() => {
  //         AddToWrongLetters;
  //         setTryCount(tryCount - 1);
  //       }}
  //     />
  //   ));
  //   return <>{wordsArray}</>;
  // };

  return (
    <>
      {/* {Test()} */}
      {GameStateFunc()}
    </>
  );
}

export default App;
