import { useState, useEffect } from "react";
import "./App.css";

function Tic_tac_toe() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState(true);
  const [winner, setWinner] = useState(null);
  const [scores, setScores] = useState({ X: 0, O: 0, draw: 0 });

  useEffect(() => {
    const storedScores = JSON.parse(localStorage.getItem("ticTacToeScores"));
    if (storedScores) {
      setScores(storedScores);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("ticTacToeScores", JSON.stringify(scores));
  }, [scores]);

  const checkWinning = () => {
    const winningPositions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
    ];
    for (let i = 0; i < winningPositions.length; i++) {
      const [a, b, c] = winningPositions[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        setWinner(squares[a], winningPositions[i]);
        updateScore(squares[a]);
        break;
      }
    }
  };

  const updateScore = (winner) => {
    setScores((prevScores) => {
      const newScores = { ...prevScores };
      newScores[winner] += 1;
      return newScores;
    });
  };

  const changeSquare = (i) => {
    if (winner || squares[i] != null) {
      return;
    }
    squares[i] = player ? "X" : "O";
    setPlayer(!player);
    setSquares([...squares]);
    checkWinning([...squares]);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setPlayer(true);
    setWinner(null);
  };

  return (
    <main>
      {squares.map((a, b) => (
        <div onClick={() => changeSquare(b)} key={b}>
          {a}
        </div>
      ))}
      {winner && (
        <div
          className="WinnerBoard"
          style={{
            backgroundColor: winner === "X" ? "rgb(93, 186, 212)" : "red",
          }}
        >
          <p>{`${winner} wins`}</p>
        </div>
      )}
      {!squares.includes(null) && !winner && (
        <div className="WinnerBoard" style={{ backgroundColor: "gray" }}>
          <p>Draw</p>
        </div>
      )}
      <button className="play-again-btn" onClick={resetGame}>
        Play Again
      </button>

      <div className="ScoreItemTitle">Player X:{scores.X}</div>

      <div className="ScoreItemTitle">Player O: {scores.O}</div>
    </main>
  );
}

export default Tic_tac_toe;
