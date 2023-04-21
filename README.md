<p align="center">
  <img src="https://github.com/YamSln/farkle/blob/main/src/client/src/assets/logo.svg"/>
</p>

# Farkle

Farkle is an online successor to the farkle folk game.

## Features

- Material design UI
- Dark theme
- Plays and score tracking
- Timed turns

## About The Game

Each player rolls the dice at his turn and tries to earn points by selecting different combinations. <br/> The game ends when a player has reached the pre-selected maximum score. <br/>
Our version of the scoring system is as follows:
No. | 1 of a kind | 2 of a kind | 3 of a kind | 4 of a kind | 5 of a kind | 6 of a kind
:---: | :---: | :---: | :---: | :---: | :---: | :---:
<img src="https://github.com/YamSln/farkle/blob/main/src/client/src/assets/dice/dice_1.svg" width="20"> | 100 | 200 | 1000 | 2000 | 4000 | 8000 
<img src="https://github.com/YamSln/farkle/blob/main/src/client/src/assets/dice/dice_2.svg" width="20"> | - | - | 200 | 400 | 800 | 1600
<img src="https://github.com/YamSln/farkle/blob/main/src/client/src/assets/dice/dice_3.svg" width="20"> | - | - | 300 | 600 | 1200 | 2400
<img src="https://github.com/YamSln/farkle/blob/main/src/client/src/assets/dice/dice_4.svg" width="20"> | - | - | 400 | 800 | 1600 | 3200
<img src="https://github.com/YamSln/farkle/blob/main/src/client/src/assets/dice/dice_5.svg" width="20"> | 50 | 100 | 500 | 1000 | 2000 | 4000
<img src="https://github.com/YamSln/farkle/blob/main/src/client/src/assets/dice/dice_6.svg" width="20"> | - | - | 600 | 1200 | 2400 | 4800

(note that only 1 and 5 can be selected as a single or duo)<br/>
Another options of earning score is to form a *straight*: <br/>
1 --> 5 = 550 points <br/>
2 --> 6 = 750 points <br/>
1 --> 6 = 1500 points <br/>

The joker die <kbd><img src="https://github.com/YamSln/farkle/blob/main/src/client/src/assets/dice/jdice_1.svg" width="40"></kbd> will change its value when it rolled as a joker (the number of the die is 1) to the best value the current selected dice allows.<br/><br/>
A *bust* is a situation when the current roll result did not yield any legal moves, the player will loose all points earned in the current turn and the game will proceed.

The *host* of the game 亗 can change the timer and restart the game, if the host disconnects, one of the remaining players will be selected as a new host.

### Installation and Running

Run `npm run build` and `npm start` to build and start the app on your local machine. <br>
The app is also heroku deployment ready and can be modified to run the build and start scripts automatticaly upon deploying.
