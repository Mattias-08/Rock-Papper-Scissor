const choices = ["rock", "paper", "scissors"];
const resultDisplay = document.getElementById("resultDisplay");
const actionButton = document.querySelector('.action-button');
const choiceButtons = document.querySelectorAll('.choice-button');

let playerScore = 0;
let computerScore = 0;
let round = 0;

/* didnt understand selection function like:
actionButton.addEventListener('click', () => {
  choiceButtons.forEach(button => button.classList.remove('disabled'));
  choiceButtons.forEach(button => button.classList.remove('active'));*/

function getPlayerChoice() {
    const choiceButtons = document.querySelectorAll('.choice-button');

    for (const button of choiceButtons) {
        if (button.classList.contains('active')) {
            return button.dataset.choice;
        }
    }

    return null;
}

function getComputerChoice() {

    /*generate random nr 0-2 to match the amount of available results*/
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

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
}