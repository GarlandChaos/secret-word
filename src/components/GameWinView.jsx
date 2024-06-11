const GameWinView = ({ score, nextWordFuncion }) => {
  return (
    <>
      <h1>You won!</h1>
      <p>Your score: {score}</p>
      <button onClick={nextWordFuncion}>Next word</button>
    </>
  );
};

export default GameWinView;
