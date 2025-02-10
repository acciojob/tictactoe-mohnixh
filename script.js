// Select elements
const player1Input = document.getElementById("player-1");
const player2Input = document.getElementById("player-2");
const submitButton = document.getElementById("submit");

// Add event listener for the button
submitButton.addEventListener("click", startGame);

function startGame() {
    const player1 = player1Input.value.trim();
    const player2 = player2Input.value.trim();

    // Check if names are entered
    if (player1 === "" || player2 === "") {
        alert("Please enter names for both players.");
        return;
    }

    // Hide inputs and button, show game board
    document.querySelector(".container").innerHTML = `
        <h1>TIC TAC TOE</h1>
        <div class="message">${player1}, you're up!</div>
        <div class="board">
            ${Array.from({ length: 9 }, (_, i) => `<div class="cell" id="${i + 1}"></div>`).join('')}
        </div>
        <button id="restart">Restart Game</button>
    `;

    setupGame(player1, player2);
}

function setupGame(player1, player2) {
    let currentPlayer = "X"; 
    let currentName = player1;
    const board = Array(9).fill(null);
    const cells = document.querySelectorAll(".cell");
    const messageDiv = document.querySelector(".message");

    cells.forEach(cell => {
        cell.addEventListener("click", () => {
            const index = cell.id - 1;

            if (!board[index]) {
                board[index] = currentPlayer;
                cell.textContent = currentPlayer;

                if (checkWin(board, currentPlayer)) {
                    messageDiv.textContent = `${currentName}, congratulations! You won!`;
                    disableBoard();
                    return;
                }

                // **Check for Draw**
                if (board.every(cell => cell !== null)) {
                    messageDiv.textContent = "It's a Draw! Try Again.";
                    return;
                }

                // Switch player
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                currentName = currentPlayer === "X" ? player1 : player2;
                messageDiv.textContent = `${currentName}, you're up!`;
            }
        });
    });

    document.getElementById("restart").addEventListener("click", () => location.reload());
}

function checkWin(board, player) {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]            
    ];

    return winningCombinations.some(combination =>
        combination.every(index => board[index] === player)
    );
}

function disableBoard() {
    document.querySelectorAll(".cell").forEach(cell => cell.style.pointerEvents = "none");
}