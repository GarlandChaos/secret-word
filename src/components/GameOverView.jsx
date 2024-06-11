const GameOverView = ({ score, restartGameFunction }) => {
  return (
    <>
      <h1>Game Over!</h1>
      <p>Your score: {score}</p>
      <button onClick={restartGameFunction}>Restart</button>
    </>
  );
};

export default GameOverView;
