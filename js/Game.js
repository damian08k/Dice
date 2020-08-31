import RandomNumberGenerator from "./components/RandomNumberGenerator.js";
import Players from "./components/Players.js";

class Game {
    constructor() {
        this.initVariables();
        this.gameMainLogic();
    }

    initVariables() {
        // from HTML structure
        this.diceThrowBtn = document.querySelector(".player-info__dice-throw");

        this.startGameBtn = document.querySelector(".start-game-window__start-game");
        this.startGameWindow = document.querySelector(".start-game-window-container");
        this.mainGameContainer = document.querySelector(".main-container");
        this.firstPlayerName = document.querySelector(".stats__first-player");
        this.secondPlayerName = document.querySelector(".stats__second-player");

        this.roundNumber = document.querySelector(".player-info__round-number");
        this.playerName = document.querySelector(".player-info__player-name");
        this.throws = [...document.querySelectorAll(".player-info__throw")];

        // instances of classes 
        this.randomNumberGenerator = new RandomNumberGenerator();
        this.players = new Players();

        // other variables
        this.playersNames = [];
        this.diceClasses = [
            "fas fa-dice-one",
            "fas fa-dice-two",
            "fas fa-dice-three",
            "fas fa-dice-four",
            "fas fa-dice-five",
            "fas fa-dice-six"
        ];
    }

    gameMainLogic() {
        this.startGameBtn.addEventListener("click", this.startGame);
        this.diceThrowBtn.addEventListener("click", this.firstThrowDice);
    }

    startGame = () => {
        const numberOfPlayers = parseInt(this.players.getNumberOfPlayers());
        this.playersNames = this.players.getPlayersNames(numberOfPlayers);
        if (this.playersNames.length !== 0) {
            this.startGameWindow.style.display = "none";
            // this.mainGameContainer.style.display = "block";
            this.firstPlayerName.textContent = this.playersNames[0];
            this.secondPlayerName.textContent = this.playersNames[1];
            this.playerName.textContent = this.playersNames[0];
        }
    }

    firstThrowDice = () => {
        const firstFiveDice = this.randomNumberGenerator.generateRandomNumbers();
        console.log(firstFiveDice);
    }
}

const game = new Game();