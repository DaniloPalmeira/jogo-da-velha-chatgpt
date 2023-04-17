// Variáveis globais
var currentPlayer = "X";
var gameEnded = false;
var playerXScore = 0;
var playerOScore = 0;

// Elementos do DOM
var cells = document.getElementsByClassName("cell");
var resultModal = document.getElementById("result-modal");
var resultMessage = document.getElementById("result-message");
var restartButton = document.getElementById("restart-button");
var resetButton = document.getElementById("reset-button");
var playerXScoreElement = document.getElementById("player-x-score");
var playerOScoreElement = document.getElementById("player-o-score");

// Função para reiniciar o jogo
function restartGame() {
	// Limpar o tabuleiro
	for (var i = 0; i < cells.length; i++) {
		cells[i].innerText = "";
	}
	// Resetar as variáveis
	currentPlayer = "X";
	gameEnded = false;
}

// Função para verificar se houve um vencedor
function checkWinner() {
	var winningCombinations = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8], // linhas
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8], // colunas
		[0, 4, 8],
		[2, 4, 6], // diagonais
	];

	for (var i = 0; i < winningCombinations.length; i++) {
		var [a, b, c] = winningCombinations[i];
		if (
			cells[a].innerText === cells[b].innerText &&
			cells[a].innerText === cells[c].innerText &&
			cells[a].innerText !== ""
		) {
			return cells[a].innerText;
		}
	}

	return null;
}

// Função para verificar se houve empate
function checkDraw() {
	for (var i = 0; i < cells.length; i++) {
		if (cells[i].innerText === "") {
			return false;
		}
	}
	return true;
}

// Função para exibir o resultado do jogo
function showResult(result) {
	if (result === "X") {
		resultMessage.innerText = "Jogador X venceu!";
		playerXScore++;
	} else if (result === "O") {
		resultMessage.innerText = "Jogador O venceu!";
		playerOScore++;
	} else {
		resultMessage.innerText = "Empate!";
	}

	playerXScoreElement.innerText = "Jogador X: " + playerXScore;
	playerOScoreElement.innerText = "Jogador O: " + playerOScore;

	resultModal.style.display = "block";
	gameEnded = true;
}

// Função para reiniciar o jogo quando o botão "Jogar novamente" é clicado
restartButton.addEventListener("click", function () {
	resultModal.style.display = "none";
	restartGame();
});

// Função para reiniciar o placar quando o botão "Reiniciar Placar" é clicado
resetButton.addEventListener("click", function () {
	playerXScore = 0;
	playerOScore = 0;
	playerXScoreElement.innerText = "Jogador X: 0";
	playerOScoreElement.innerText = "Jogador O: 0";
});

// Loop para adicionar eventos de clique em cada célula do tabuleiro
for (var i = 0; i < cells.length; i++) {
	cells[i].addEventListener("click", function () {
		if (this.innerText === "" && !gameEnded) {
			this.innerText = currentPlayer;
			var winner = checkWinner();
			if (winner) {
				showResult(winner);
			} else if (checkDraw()) {
				showResult(null);
			} else {
				currentPlayer = currentPlayer === "X" ? "O" : "X";
			}
		}
	});
}
