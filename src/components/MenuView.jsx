const MenuView = ({ startGameFunction }) => {
  return (
    <>
      <h1>SECRET WORD</h1>
      <button onClick={startGameFunction}>Play</button>
    </>
  );
};

export default MenuView;
