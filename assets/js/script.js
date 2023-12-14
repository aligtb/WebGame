let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameMode = 0;

function startGame(mode) {
  gameMode = mode;
  document.getElementById('player-selection').classList.add('hidden');
  document.getElementById('game-board').classList.remove('hidden');
  drawBoard();
}

function drawBoard() {
  const gameBoard = document.getElementById('game-board');
  gameBoard.innerHTML = '';
  board.forEach((cell, index) => {
    gameBoard.innerHTML += `<div class="cell" onclick="makeMove(${index})">${cell}</div>`;
  });
}


// Modify the makeMove function to call checkWinner and endGame when appropriate
function makeMove(index) {
  if (board[index] !== '') endGame(checkWinner(board));
  board[index] = currentPlayer;
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  drawBoard();
  if (gameMode === 1) aiMove();
}

function aiMove() {
  // Simple AI to make a move
  let available = board.map((cell, index) => cell === '' ? index : null).filter(val => val !== null);
  if (available.length === 0) return;
  let randomIndex = available[Math.floor(Math.random() * available.length)];
  board[randomIndex] = currentPlayer;
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  drawBoard();
}


function loadGame(gameId) {
  document.getElementById('game-selection').classList.add('hidden');
  document.getElementById(gameId).classList.remove('hidden');
}

function checkWinner(board) {
  // define the winning combinations
  const lines = [
    [0, 1, 2], // first row
    [3, 4, 5], // second row
    [6, 7, 8], // third row
    [0, 3, 6], // first column
    [1, 4, 7], // second column
    [2, 5, 8], // third column
    [0, 4, 8], // first diagonal
    [2, 4, 6], // second diagonal
  ];

  // loop through the lines and check if any of them has the same symbol
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]; // get the indices of the line
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]; // return the symbol of the winner
    }
  }

  // check if the board is full
  if (board.every(cell => cell !== '')) {
    return 'Draw'; // return 'Draw' if no empty cells
  }

  return null; // return null if no winner and not full
}


function endGame(winner) {
  let winnerText = winner === 'Draw' ? 'It\'s a draw!' : `Player ${winner} wins!`;
  document.getElementById('winner-announcement').textContent = winnerText;
  document.getElementById('game-board').classList.add('hidden');
  document.getElementById('game-over').classList.remove('hidden');
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  document.getElementById('game-over').classList.add('hidden');
  document.getElementById('player-selection').classList.remove('hidden');
  drawBoard();
}



