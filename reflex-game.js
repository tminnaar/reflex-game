const target = document.getElementById("game-target");
const scoreDisplay = document.getElementById("score-number");
const timeDisplay = document.getElementById("time-number");
const highScoreDisplay = document.getElementById("high-score-number");
const gamePopUp = document.getElementById("game-popup-box");
const gamePopUpText = document.getElementById("game-popup-text");
const bonusTarget = document.getElementById("bonus-target");
const currentStreakCount = document.getElementById("streak-number");

const maxTargetSize = 160;
const minTargetSize = 60;

const maxPosition = 60;

const timerMaxLength = 30;

let currentScore = 0;
let currentStreak = 0;
let timeRemaining = 0;
let currentHighScore = 0;

//clicking the target randomises its size and position within a range. string interpolation pushes the generated values into the stylings. score value is increased when clicked.
function targetClick(event) {
	const targetSize = Math.floor(Math.random() * (maxTargetSize - minTargetSize)) + minTargetSize;
	target.style.width = target.style.height = `${targetSize}px`;

	let targetTop = Math.floor(Math.random() * maxPosition);
	let targetLeft = Math.floor(Math.random() * maxPosition);

	target.style.top = `${targetTop}%`;
	target.style.left = `${targetLeft}%`;

	//after every 5 successfull hits, increases score per hit by 1
	let bonus = Math.floor(currentStreak / 5) + 1;
	currentScore += bonus;
	currentStreak++;

	scoreDisplay.textContent = `${currentScore} + ${bonus}`;
	currentStreakCount.textContent = currentStreak;

	//prevents event triggering on parent
	event.stopPropagation();
}

//resets streak bonus counter when target is missed
function targetMiss() {
	currentStreak = 0;
}

//initialises the game, resets the timer and current score.
function startGame() {
	currentScore = 0;
	currentStreak = 0;
	currentStreakCount.textContent = currentStreak;
	scoreDisplay.textContent = currentScore;

	//hides the menu pop-up.
	target.style.display = "block";
	gamePopUp.style.display = "none";

	timeRemaining = timerMaxLength;

	//interpolates the remaining time.
	timeDisplay.textContent = `${timeRemaining}s`;

	//updates the time remaning value every second.
	const timerInterval = setInterval(() => {
		timeRemaining--;
		timeDisplay.textContent = `${timeRemaining}s`;
	}, 1000);

	//on time-out hides the target, displays the pop-up and alters the text to "Try Again?"
	setTimeout(() => {
		clearInterval(timerInterval);
		target.style.display = "none";
		gamePopUp.style.display = "flex";
		gamePopUpText.textContent = "Try Again?";

		//if the high score is surpassed, the high score display on the left is updated and on time-out the pop-up text becomes "🎉New High Score!🎉Try Again?".
		if (currentScore > currentHighScore) {
			currentHighScore = currentScore;
			highScoreDisplay.textContent = currentHighScore;
			gamePopUpText.textContent = "🎉New High Score!🎉Try Again?";
		}
	}, timerMaxLength * 1000);
}
