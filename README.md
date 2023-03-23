# Reflex Game

A reaction time-based game with each rounding lasting 30 seconds. The goal is to click as many targets within the allotted time while the targets randomly resize and reposition. On the right is a panel that displays the time remaining, the current score and the high score.

I used DOM manipulation to update the text values for time remaining, current score and high score. I used setInterval and setTimeout for the first time here. setInterval is used to countdown the time remaining and push the value to the display on the right. setTimeout stops the game, removes the target and allows the user to start again.

### Planning

Having spent a lot of time playing CS:GO I thought it might be fun to build a reaction time based aim trainer, akin to the ones some players use to warm up before sessions.

Considering the sizing limitations within my website, I drew out a pseudo horizontal mobile phone display and separated a game area from a display panel for the score and time remaining. Regarding the functions I knew I'd need some way to initialise the game, a timer to end the game and something to resize and reposition the target. A function would also be required to update the current score, high score and a way to count down the time remaining.

### Building

I started out grabbing references for all elements I'd need to update or alter, the target size and position, score and high score values, time remaining and the pop-up in between rounds.
I gave the target sizes a range to randomise between and a maximum position value so the target would remain fully within the game area.
Following that, I then created the targetClick function.

```javascript
function targetClick(event) {
	const targetSize = Math.floor(Math.random() * (maxTargetSize - minTargetSize)) + minTargetSize;
	target.style.width = target.style.height = `${targetSize}px`;

	let targetTop = Math.floor(Math.random() * maxPosition);
	let targetLeft = Math.floor(Math.random() * maxPosition);

	target.style.top = `${targetTop}%`;
	target.style.left = `${targetLeft}%`;

	let bonus = Math.floor(currentStreak / 5) + 1;
	currentScore += bonus;
	currentStreak++;

	scoreDisplay.textContent = `${currentScore} + ${bonus}`;
	currentStreakCount.textContent = currentStreak;

	event.stopPropagation();
}

function targetMiss() {
	currentStreak = 0;
}
```

This function uses Math.floor(Math.random()) and my maximum size and position values to randomise them and then using string interpolation it pushes the values into their respective elements.Clicking the target increments the score value, streak counter and modifier and pushes those values to the score display panel. As the users' score streak increases, a modifier increases the score per successful click. targetMiss() then resets the modifier to 0.

```javascript
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
```

startGame() initilises the game on page load and at the end of the countdown. The first step is resetting the current score to 0 and toggling the display of the pop-up box. I used set interval to decrement every second and interpolate the time remaining into the display element. Within startGame() is the setTimeout() function. After the countdown has run down the target is hidden and the pop-up is displayed again using the .style.display method and "Start Game" becomes "Try Again?". Lastly within the function is an if conditional that, if the current score surpasses the high score, the highScore value is updated and displayed and the text in the pop-up becomes "🎉New High Score!🎉Try Again?".

### Debugging

At first, I noticed the target was sometimes positioned halfway outside the game area. Initially I ran the game and console.logged targetLeft and targetTop to dial in their maximum values to prevent this from occurring. I then realised that if I worked out what percentage the maximum potential height/width of the target was of the total game area, I could set maximum position value to be the percentage difference.

The second error I encountered came when adding in functionality for a streak bonus that would reset when the user would miss the target. I added an onclick function called 'targetMiss' that would trigger when the game area was clicked instead of the target, but it still triggered a miss even when the target was clicked. I realised this by logging "missed" inside the 'targetMiss'. I Googled "onclick event called on parent" and came accross a few StackOverflow posts that suggested using 'event.stopPropagation()' which would prevent any other listeners higher in the DOM from receiving the event.
