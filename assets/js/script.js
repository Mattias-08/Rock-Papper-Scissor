/**
 * choices is an array of all the possible choices in the game
 * resultDisplay retrieves the HTML element with ID winner text
 * actionButtonretrieves the HTML element with
 * choiceButtons retrieves the HTML element with
 * resultDisplay retrieves the HTML element with
 * resultDisplay retrieves the HTML element with
 * resultDisplay retrieves the HTML element with
 * resultDisplay retrieves the HTML element with
 * resultDisplay retrieves the HTML element with
 */

const choices = ["rock", "paper", "scissors"];
const resultDisplay = document.getElementById("winner-text");
const actionButton = document.querySelector('.action-button');
const choiceButtons = document.querySelectorAll('.choice-button');
const buttonContainer = document.querySelector('.button-container')
const resetButton = document.querySelector('.reset-button');
const roundsCount = document.getElementById("rounds-count");
const resultsCount = document.getElementById("results-count");
// these variables tracks the players and computers score and shows which round it is
let playerScore = 0;
let computerScore = 0;
let round = 0;


document.addEventListener('DOMContentLoaded', function () {
    actionButton.addEventListener('click', () => {
        buttonContainer.classList.remove('hide')
        actionButton.classList.add('hide')
    })

    choiceButtons.forEach((buttonToClick) => {
        buttonToClick.addEventListener('click', () => {
            const clickedButton = event.target;
            const playerChoice = clickedButton.dataset.choice;

            if (playerChoice) {
                const computerChoice = getComputerChoice();
                const winner = determineWinner(playerChoice, computerChoice);
                updateResultDisplay(winner);
            }
        });
    });
    resetButton.addEventListener('click', resetGame);
});


function getComputerChoice() {

    /*generate random nr 0-2 to match the amount of available results*/
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];

}
/**
 * this functions recieves playerchoice and computer choice to calculate the whe winner
 *  if they have the same symbol then the result is tie otherways there is 3 else if statements that handle different player choices and 
 *  what computer choices they win or lose too. 
 */
function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return 'tie';
    } else if (playerChoice === 'rock') {
        return computerChoice === 'scissors' ? 'player' : 'computer';
    } else if (playerChoice === 'paper') {
        return computerChoice === 'rock' ? 'player' : 'computer';
    } else if (playerChoice === 'scissors') {
        return computerChoice === 'paper' ? 'player' : 'computer';
    }
    /**
     * updateResultDisplay 
     */
}

function updateResultDisplay(winner) {
    let message;
    if (winner === 'tie') {
        message = "It's a tie!";
    } else if (winner === 'player') {
        message = "You Win!";
        playerScore++;
    } else {
        message = "The computer wins.";
        computerScore++;
    }

    resultDisplay.textContent = message;
    round++;
    roundsCount.textContent = round;
    resultsCount.textContent = `${playerScore}-${computerScore}`;

    if (round === 5) {
        resetButton.classList.remove('hide');
        const choiceButtons = document.querySelectorAll('.choice-button');
        choiceButtons.forEach(button => button.disabled = true); // Disable buttons
        // Determine winner based on score
        let winnerMessage;
        if (playerScore > computerScore) {
            winnerMessage = "Game over, You Won!";
        } else if (playerScore < computerScore) {
            winnerMessage = "Game over, The computer wins.";
        } else {
            winnerMessage = "Game over, It's a tie!";
        }

        resultDisplay.textContent = winnerMessage;
    }
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    round = 0;

    resultDisplay.textContent = "";
    roundsCount.innerHTML = '0';
    resultsCount.textContent = `${playerScore}-${computerScore}`;
    actionButton.classList.remove('hide');
    choiceButtons.forEach(button => button.disabled = false);
    resetButton.classList.add('hide');
}