import RandomNumberGenerator from "./components/RandomNumberGenerator.js";
import Players from "./components/Players.js";
import Dice from "./components/Dice.js";

class Game {
    constructor() {
        this.initVariables();
        this.gameMainLogic();
    }

    initVariables() {
        this.diceThrowBtn = document.querySelector(".player-info__dice-throw");

        this.startGameBtn = document.querySelector(".start-game-window__start-game");
        this.startGameWindow = document.querySelector(".start-game-window-container");
        this.mainGameContainer = document.querySelector(".main-container");
        this.firstPlayerName = document.querySelector(".stats__first-player");
        this.secondPlayerName = document.querySelector(".stats__second-player");

        this.roundNumber = document.querySelector(".player-info__round-number");
        this.playerName = document.querySelector(".player-info__player-name");
        this.throws = [...document.querySelectorAll(".player-info__throw")];

        this.randomNumberGenerator = new RandomNumberGenerator();
        this.players = new Players();
        this.dice = new Dice();

        this.playersNames = [];
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
        this.dice.showDice(firstFiveDice);
    }
}

const game = new Game();