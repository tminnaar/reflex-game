# Reflex Game

A reaction time-based game with each rounding lasting 30 seconds. The goal is to click as many targets within the allotted time while the targets randomly resize and reposition. On the right is a panel that display the time remaining, the current score and the high score.

I used DOM manipulation to update the text values for time remaining, current score and high score. I used setInterval and setTimeout for the first time here. setInterval is used to countdown the time remaining and push the value to the display on the right. setTimeout stops the game, removes the target and allows the user to start again.

### Planning

Having spent alot of time playing CS:GO I thought it might be fun to build a reaction time based aim trainer, akin to the ones some players use to warm up before sessions.
Considering the sizing limitations within my website, I drew out a psuedo horizontal mobile phone display and seperated a game area from a display panel for the score and time remaining. Regarding the functions I knew I'd need some way to initialise the game, a timer to end the game and something to resize and reposition the target. A function would also be required to update the current score, high score and a way to count down the time remaining.

### Building

I started out grabbing references for all elements I'd need to update or alter, the target size and position, score and high score values, time remaining and the pop-up in between rounds.
I gave the target sizes a range to randomise between

### Debugging
