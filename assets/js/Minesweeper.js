document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelector('#easy').addEventListener('click', () => startGame(10, 10));
    document.querySelector('#medium').addEventListener('click', () => startGame(20, 40));
    document.querySelector('#hard').addEventListener('click', () => startGame(30, 90));
});

function startGame(gridSize, mineCount) {
    // Initialize game variables
    var grid = [];
    var minePositions = [];

    // Create grid
    for (var i = 0; i < gridSize; i++) {
        grid[i] = [];
        for (var j = 0; j < gridSize; j++) {
            grid[i][j] = 0;
        }
    }

    // Place mines
    while (minePositions.length < mineCount) {
        var position = Math.floor(Math.random() * gridSize * gridSize);
        if (!minePositions.includes(position)) {
            minePositions.push(position);
            var row = Math.floor(position / gridSize);
            var col = position % gridSize;
            grid[row][col] = 'M';
        }
    }

    // Calculate numbers
    for (var i = 0; i < gridSize; i++) {
        for (var j = 0; j < gridSize; j++) {
            if (grid[i][j] !== 'M') {
                var minesAdjacent = 0;
                for (var dx = -1; dx <= 1; dx++) {
                    for (var dy = -1; dy <= 1; dy++) {
                        var ni = i + dx;
                        var nj = j + dy;
                        if (ni >= 0 && ni < gridSize && nj >= 0 && nj < gridSize && grid[ni][nj] === 'M') {
                            minesAdjacent++;
                        }
                    }
                }
                grid[i][j] = minesAdjacent;
            }
        }
    }

    // Display grid
    var minefield = document.querySelector('#minefield');
    minefield.innerHTML = '';
    for (var i = 0; i < gridSize; i++) {
        for (var j = 0; j < gridSize; j++) {
            var cell = document.createElement('div');
            cell.classList.add('cell');
            cell.textContent = grid[i][j];
            minefield.appendChild(cell);
        }
        minefield.appendChild(document.createElement('br'));
    }
}
