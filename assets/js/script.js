/**
 * choices is an array of all the possible choices in the game
 * resultDisplay and the others const retrieves IDs or classes with the name displayed
 * inside their  parentheses 
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
let round = 1;

/**
 * this event listener waits for the HTML content to be loaded and then sets up
 * event listeners, firstly the button  that starts the game which shows the
 * choice buttons and hides itself
 */
document.addEventListener('DOMContentLoaded', function () {
    actionButton.addEventListener('click', () => {
        buttonContainer.classList.remove('hide')
        actionButton.classList.add('hide')
    })
    /**
     * gets a reference to the clicked buttons using event target uses a lokal
     * variable player choice to extract the players choice
     */
    choiceButtons.forEach((buttonToClick) => {
        buttonToClick.addEventListener('click', () => {
            const clickedButton = event.target;
            const playerChoice = clickedButton.dataset.choice;
            /**
             * then if  there is a player choice recieve the computers choice from
             * the getComputerChoice and put it inside a variable, after that 
             * get the value of winner by calling the determineWinner function who recieves 
             * the players and computers choices.
             * calls the updateResultDisplay and gives it the value of winner, also includes the reset button
             */
            if (playerChoice) {
                const computerChoice = getComputerChoice();
                const winner = determineWinner(playerChoice, computerChoice);
                updateResultDisplay(winner);
            }
        });
    });
    resetButton.addEventListener('click', resetGame);
});

// gives ranomdInex a randomnumber betwin 0-1 and that gets muliplied by 3 and rounded to end up with a value betwin 0-2
function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];

}

/**
 * this functions recieves playerchoice and computer choice to calculate the whe winner
 *  if they have the same symbol then the result is tie, otherways there is three else if statements that handle different player choices and 
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
     * updateResultDisplay has a lokal variable message and uses a if else statmenent to see which
     * message winner is identical too. It also adds to the score of the winner
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
    /**
     * after that it shows a winenr message, updates the roundcount, its text and the resultcountmessage
     * after that follows an if statement that triggers when the round is exactly 5, it then reveals the new game button
     * and disables the choice buttons for rock, pappers and scisssors. Then it creates a lokal variable with a if-else function 
     * to give an fitting message depending on who won.
     */
    resultDisplay.textContent = message;
    round++;
    roundsCount.textContent = round;
    resultsCount.textContent = `Player: ${playerScore} - Computer: ${computerScore}`;

    if (round === 6) {
        resetButton.classList.remove('hide');
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
/**
 * Function to reset all the variables and textcontent for a new round
 * and hiding the reset button untill a new game is started.
 *   */
function resetGame() {
    playerScore = 0;
    computerScore = 0;
    round = 1;
    resultDisplay.textContent = "";
    roundsCount.innerHTML = round;
    resultsCount.textContent = `Player: ${playerScore} - Computer: ${computerScore}`;
    choiceButtons.forEach(button => button.disabled = false);
    resetButton.classList.add('hide');
}