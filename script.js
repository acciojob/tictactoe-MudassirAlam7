const player1Input = document.getElementById("player-1");
    const player2Input = document.getElementById("player-2");
    const submitBtn = document.getElementById("submit");
    const board = document.getElementById("board");
    const cells = document.querySelectorAll(".cell");
    const messageDiv = document.querySelector(".message");

    let currentPlayer = "X";
    let player1 = "";
    let player2 = "";
    let roundWon = false;

    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
    ];

    let options = ["", "", "", "", "", "", "", "", ""];

    function checkWinner() {
      for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i];
        if (options[a] && options[a] === options[b] && options[a] === options[c]) {
          roundWon = true;
          return options[a];
        }
      }
      return null;
    }

    function updateMessage() {
      if (roundWon) return;
      const currentPlayerName = currentPlayer === "X" ? player1 : player2;
      messageDiv.textContent = `${currentPlayerName}, you're up!`;
    }

    submitBtn.addEventListener("click", () => {
      player1 = player1Input.value.trim();
      player2 = player2Input.value.trim();

      if (player1 && player2) {
        board.style.display = "grid";
        updateMessage();
      } else {
        alert("Please enter names for both players.");
      }
    });

    cells.forEach((cell) => {
      cell.addEventListener("click", () => {
        if (!cell.textContent && !roundWon) {
          cell.textContent = currentPlayer;
          cell.classList.add("taken");

          const cellIndex = parseInt(cell.id);
          options[cellIndex] = currentPlayer;

          const winner = checkWinner();
          if (winner) {
            const winnerName = winner === "X" ? player1 : player2;
            messageDiv.textContent = `${winnerName}, congratulations you won!`;
          } 
			  else if (!options.includes('')){
				  messageDiv.textContent = `Draw`
        }
		  else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            updateMessage();
          }
        }
      });
    });