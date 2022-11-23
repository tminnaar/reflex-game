const target = document.getElementById("game-target");
const scoreDisplay = document.getElementById("score-number");
const timeDisplay = document.getElementById("time-number");
const highScoreDisplay = document.getElementById("high-score-number");
const gamePopUp = document.getElementById("game-popup-box");
const gamePopUpText = document.getElementById("game-popup-text");

const maxTargetSize = 160;
const minTargetSize = 60;

const maxPosition = 75;

const timerMaxLength = 30;

let currentScore = 0;
let timeRemaining = 0;
let currentHighScore = 0;

function targetClick() {
	const targetSize = Math.floor(Math.random() * (maxTargetSize - minTargetSize)) + minTargetSize;
	target.style.width = target.style.height = `${targetSize}px`;

	let targetTop = Math.floor(Math.random() * maxPosition);
	let targetLeft = Math.floor(Math.random() * maxPosition);

	target.style.top = `${targetTop}%`;
	target.style.left = `${targetLeft}%`;

	currentScore++;
	scoreDisplay.textContent = currentScore;
}

function startGame() {
	currentScore = 0;
	scoreDisplay.textContent = currentScore;
	target.style.display = "block";
	gamePopUp.style.display = "none";

	timeRemaining = timerMaxLength;
	timeDisplay.textContent = `${timeRemaining}s`;

	const timerInterval = setInterval(() => {
		timeRemaining--;
		timeDisplay.textContent = `${timeRemaining}s`;
	}, 1000);

	setTimeout(() => {
		clearInterval(timerInterval);
		target.style.display = "none";
		gamePopUp.style.display = "flex";
		gamePopUpText.textContent = "Try Again?";

		if (currentScore > currentHighScore) {
			currentHighScore = currentScore;
			highScoreDisplay.textContent = currentHighScore;
			gamePopUpText.textContent = "🎉New High Score!🎉Try Again?";
		}
	}, timerMaxLength * 1000);
}
