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
  if (board[index] !== '') return;
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

function checkWinner() {
  // Add your logic to check for a winner and return 'X', 'O', or 'Draw'
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



