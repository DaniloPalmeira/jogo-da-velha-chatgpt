var currentPlayer = 1;
var player1Score = 0;
var player2Score = 0;
var gameOver = false;
var winningCombinations = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

$(document).ready(function () {
	$(".cell").on("click", function () {
		if (!gameOver && $(this).text() === "") {
			var cellId = $(this).attr("id");
			var cellIndex = parseInt(cellId.replace("cell-", ""));

			if (currentPlayer === 1) {
				$(this).text("X").css("color", "#FFD700");
			} else {
				$(this).text("O").css("color", "#00FFFF");
			}

			var winner = checkWin();
			if (winner !== 0) {
				gameOver = true;
				updateStatus("Jogador " + winner + " venceu!");
				updateScore(winner);
				playWinEffect();
			} else if (checkDraw()) {
				gameOver = true;
				updateStatus("Empate!");
				playDrawEffect();
			} else {
				switchPlayer();
			}
		}
	});

	$("#reset-score").on("click", function () {
		player1Score = 0;
		player2Score = 0;
		updateScoreboard();
	});

	$("#reset-game").on("click", function () {
		// Limpa o texto das células do jogo
		$(".cell").text("");
		// Redefine a variável gameOver para false
		gameOver = false;
		// Atualiza o status do jogo para o jogador 1
		updateStatus(`Vez do Jogador ${currentPlayer}`);
		// Remove a cor de fundo das células
		$(".cell").css("background-color", "");
	});

	function checkWin() {
		for (var i = 0; i < winningCombinations.length; i++) {
			var combination = winningCombinations[i];
			if (
				$("#cell-" + combination[0]).text() !== "" &&
				$("#cell-" + combination[0]).text() ===
					$("#cell-" + combination[1]).text() &&
				$("#cell-" + combination[0]).text() ===
					$("#cell-" + combination[2]).text()
			) {
				return currentPlayer;
			}
		}
		return 0;
	}

	function checkDraw() {
		var draw = true;
		$(".cell").each(function () {
			if ($(this).text() === "") {
				draw = false;
				return false;
			}
		});
		return draw;
	}

	function switchPlayer() {
		currentPlayer = currentPlayer === 1 ? 2 : 1;
		updateStatus("Vez do Jogador " + currentPlayer);
	}

	function updateStatus(message) {
		$("#status").text(message);
	}

	function updateScore(player) {
		if (player === 1) {
			player1Score++;
		} else {
			player2Score++;
		}
		updateScoreboard();
	}

	function updateScoreboard() {
		$("#score-player1").text("Jogador 1: " + player1Score);
		$("#score-player2").text("Jogador 2: " + player2Score);
	}

	function playWinEffect() {
		$(".cell").css("background-color", "#222");
		var winningCombination = winningCombinations.filter(function (combination) {
			return (
				$("#cell-" + combination[0]).text() !== "" &&
				$("#cell-" + combination[0]).text() ===
					$("#cell-" + combination[1]).text() &&
				$("#cell-" + combination[0]).text() ===
					$("#cell-" + combination[2]).text()
			);
		});
		winningCombination = winningCombination[0];
		$("#cell-" + winningCombination[0]).css("background-color", "#32CD32");
		$("#cell-" + winningCombination[1]).css("background-color", "#32CD32");
		$("#cell-" + winningCombination[2]).css("background-color", "#32CD32");
	}

	function playDrawEffect() {
		$(".cell").css("background-color", "#FF4500");
	}
});
