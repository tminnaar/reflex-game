# Reflex Game

A reaction time-based game with each rounding lasting 30 seconds. The goal is to click as many targets within the allotted time while the targets randomly resize and reposition. On the right is a panel that display the time remaining, the current score and the high score.

I used DOM manipulation to update the text values for time remaining, current score and high score. I used setInterval and setTimeout for the first time here. setInterval is used to countdown the time remaining and push the value to the display on the right. setTimeout stops the game, removes the target and allows the user to start again.
