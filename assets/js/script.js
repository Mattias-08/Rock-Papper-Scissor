const choices = ["rock", "paper", "scissors"];
const resultDisplay = document.getElementById("resultDisplay");
const actionButton = document.querySelector('.action-button');
const choiceButtons = document.querySelectorAll('.choice-button');
console.log(choiceButtons)
const buttonContainer = document.querySelector('.button-container')
const resetButton = document.querySelector('.reset-button');

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
                console.log("Player Choice:", playerChoice);
                // Use playerChoice in your game logic
                const computerChoice = getComputerChoice();
                const winner = determineWinner(playerChoice, computerChoice);
                updateResultDisplay(winner);
            } else {
                console.log("Invalid choice");
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

    const resultDisplay = document.getElementById("winner-text");
    resultDisplay.textContent = message;
    round++;
    const roundsCount = document.getElementById("rounds-count");
    roundsCount.textContent = round;
    const resultsCount = document.getElementById("results-count");
    resultsCount.textContent = `${playerScore}-${computerScore}`;
    const resetButton = document.querySelector('.reset-button');
    resetButton.classList.remove('hide');


    if (round === 5) {
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

    const resultDisplay = document.getElementById("resultDisplay");
    resultDisplay.textContent = "";
    buttonContainer.classList.add('hide');
    choiceButtons.forEach(button => button.disabled = false);
    resetButton.classList.add('hide');
}