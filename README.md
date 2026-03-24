# Hangman Game

A classic Hangman word guessing game built using Vanilla JavaScript, HTML, and CSS.  
The project was created as a learning exercise to strengthen JavaScript logic and DOM manipulation skills.

## Project Overview
The game challenges the player to guess the letters of a randomly selected word.  
Each wrong guess draws a part of the hangman figure.  
If the player completes the drawing by making too many incorrect guesses, the game is lost.  
If all letters of the word are guessed correctly, the player wins.

## Features
- Random word selection
- Letter-by-letter guessing
- Visual drawing progress for wrong guesses
- Win and lose conditions
- Game reset functionality

## Technologies Used
- HTML
- CSS
- Vanilla JavaScript

## Technical Highlights
- DOM manipulation without using any frameworks
- Game logic fully handled with JavaScript
- Letter comparison logic using array indexing
- Conditional rendering based on correct and incorrect guesses

## Challenges
The most challenging part of this project was implementing the game logic itself.  
This included splitting the word into indexed letters, comparing each guessed letter with the word characters, and handling different outcomes depending on whether the letter exists or not.

## Project Purpose
This project was built mainly for learning purposes, focusing on JavaScript logic, problem-solving, and DOM manipulation.

## How to Run the Project
Open `index.html` in your browser.
