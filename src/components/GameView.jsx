import { useState } from "react";
import "./GameView.css";
import { ArrayIncludes } from "../js/ArrayUtils.js";

const GameView = ({
  word,
  tip,
  tryCount,
  correctLetters,
  wrongLetters,
  correctLetterFunction,
  wrongLetterFunction,
}) => {
  let inputArray = [];
  for (let i = 0; i < word.length; i++) {
    inputArray.push(
      <div key={i} className="letterBox">
        {ArrayIncludes(correctLetters, word[i]) && word[i].toUpperCase()}
      </div>
    );
  }

  //React states
  const [inputLetter, setInputLetter] = useState("");

  //Event handlers
  const HandleFormSubmit = (e) => {
    e.preventDefault();

    if (word && ArrayIncludes(word, inputLetter)) {
      correctLetterFunction(inputLetter);
    } else {
      wrongLetterFunction(inputLetter);
    }

    setInputLetter("");
  };

  return (
    <>
      {console.log("aa")}
      <h1>Guess the word:</h1>
      <p>Word tip: {word ? tip : ""}</p>
      <p>You still have {tryCount} tries.</p>
      <div id="letterBoxContainer">{inputArray}</div>
      <p>Try to guess a letter from the word:</p>
      <form onSubmit={HandleFormSubmit}>
        <label>
          <span>Letter:</span>
          <input
            type="text"
            maxLength="1"
            onChange={(e) => {
              e.preventDefault();
              setInputLetter(e.target.value.toUpperCase());
            }}
            value={inputLetter}
          />
        </label>
        <input type="submit" value="Send" />
      </form>
      <p>Wrong letters used:</p>
      <p>{wrongLetters.join(", ")}</p>
    </>
  );
};

export default GameView;
