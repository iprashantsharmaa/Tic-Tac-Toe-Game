let playerXScore = 0,
    playerOScore = 0,
    squares = [],
    isPlayerXTurn = true;

let resultLabel = document.querySelector(".result"),
    dialogWindow = document.querySelector(".window"),
    cellContainer = document.querySelector(".cell-container"),
    cells = document.querySelectorAll(".cell"),
    resetButton = document.querySelector(".reset"),
    playerXScoreLabel = document.querySelector(".playerX"),
    playerOScoreLabel = document.querySelector(".playerO");


   //to check if there is a winner or not.

function checkIfAnyPlayerWon(squares) {
  const winningCombinatiwons = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < winningCombinatiwons.length; i++) {
    const [i1, i2, i3] = winningCombinatiwons[i];
    if (squares[i1] && squares[i1].toString() === squares[i2] && squares[i2].toString() === squares[i3] && squares[i3].toString()) {
      return squares[i1];
    }
  }

  return null;
}

// to po-up the dialogue box after getting winner;
function toggleDialogVisibility(show) {
  const classes = dialogWindow.classList;
  classes.remove(show ? "hide" : "show");
  classes.add(show ? "show" : "hide");
}

//to reset the game after the game is over.
function reset() {
  squares = [];
  toggleDialogVisibility(false);
  cells.forEach(cell => cell.innerHTML = "");
}

function isGameDrawn(squares) {
  return squares.filter(val => !!val).length === 9;
}

// to increment the score in scoreboard.
function incrementScore(winner) {
  if (winner === "X") {
    playerXScore += 1;
    playerXScoreLabel.innerHTML = playerXScore;
  } else {
    playerOScore += 1;
    playerOScoreLabel.innerHTML = playerOScore;
  }
}

function main() {
  attachClickListeners();
}

function attachClickListeners() {
  cellContainer.addEventListener("click", event => handleCellClick(event.target));
  resetButton.addEventListener("click", reset);
}

function handleCellClick(cell) {
  const cellData = cell.getAttribute("data-cell");
  const cellValue = squares[cellData];
  if (cellData && !cellValue) {
    const playerName = isPlayerXTurn ? "X" : "O";
    cell.innerHTML = playerName;
    squares[cellData] = playerName;
    isPlayerXTurn = !isPlayerXTurn;
    const winnerName = checkIfAnyPlayerWon(squares);
    if (winnerName) {
      resultLabel.innerHTML = winnerName + " " + "WINS!";
      toggleDialogVisibility(true);
      incrementScore(winnerName);
    } else if (isGameDrawn(squares)) {
      resultLabel.innerHTML = "Draw!";
      toggleDialogVisibility(true);
    }
  }
}

main();