// Select elements
const player1Input = document.getElementById("player-1");
const player2Input = document.getElementById("player-2");
const submitButton = document.getElementById("submit");
const container = document.querySelector(".container");

// Add event listener for start button
submitButton.addEventListener("click", startGame);

function startGame() {
    const player1 = player1Input.value.trim();
    const player2 = player2Input.value.trim();

    // Ensure both players enter names
    if (player1 === "" || player2 === "") {
        alert("Please enter names for both players.");
        return;
    }

    // Hide input form and show game board
    document.querySelector(".setup").style.display = "none";
    container.innerHTML += `
        <h1>TIC TAC TOE</h1>
        <div class="message">${player1}, you're up!</div>
        <div class="board">
            ${Array.from({ length: 9 }, (_, i) => `<div class="cell" id="cell-${i}"></div>`).join('')}
        </div>
        <button id="restart">Restart Game</button>
    `;

    setupGame(player1, player2);
}

function setupGame(player1, player2) {
    let currentPlayer = "X";
    let currentName = player1;
    const boardState = Array(9).fill(null);
    const cells = document.querySelectorAll(".cell");
    const messageDiv = document.querySelector(".message");

    // Ensure event listeners are properly set
    cells.forEach((cell, index) => {
        cell.addEventListener("click", () => {
            if (!boardState[index]) {
                boardState[index] = currentPlayer;
                cell.textContent = currentPlayer;

                if (checkWin(boardState, currentPlayer)) {
                    messageDiv.textContent = `${currentName}, congratulations! You won!`;
                    disableBoard();
                    return;
                }

                // **Check for Draw**
                if (boardState.every(cell => cell !== null)) {
                    messageDiv.textContent = "It's a Draw! Try Again.";
                    disableBoard();
                    return;
                }

                // Switch player
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                currentName = currentPlayer === "X" ? player1 : player2;
                messageDiv.textContent = `${currentName}, you're up!`;
            }
        });
    });

    document.getElementById("restart").addEventListener("click", restartGame);
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
    document.querySelectorAll(".cell").forEach(cell => {
        cell.style.pointerEvents = "none"; // Prevent clicks
    });
}

// Restart game correctly without reloading (Cypress compatibility)
function restartGame() {
    container.innerHTML = `
        <div class="setup">
            <h1>TIC TAC TOE</h1>
            <input type="text" id="player-1" placeholder="Enter Player 1 Name">
            <input type="text" id="player-2" placeholder="Enter Player 2 Name">
            <button id="submit">Start Game</button>
        </div>
    `;
    
    // Reattach event listener after restart
    document.getElementById("submit").addEventListener("click", startGame);
}