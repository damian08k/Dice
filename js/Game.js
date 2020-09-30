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
        this.fiveDice = [];
    }

    gameMainLogic() {
        this.startGameBtn.addEventListener("click", this.startGame);
        this.diceThrowBtn.addEventListener("click", () => {
            if (this.diceThrowBtn.dataset.name === "throw") {
                this.firstThrowDice();
            } else {
                this.rethrowDice();
            }
        });
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

    changeThrowButtonValues(contentValue, dataNameValue) {
        this.diceThrowBtn.textContent = contentValue;
        this.diceThrowBtn.dataset.name = dataNameValue;
    }

    firstThrowDice = () => {
        this.fiveDice = this.randomNumberGenerator.generateRandomNumbers(5);
        this.dice.showDice(this.fiveDice);
        this.dice.setListenersToDice();
        this.changeThrowButtonValues("Przerzuć kości!", "rethrow");
        console.log(this.fiveDice);
    }

    rethrowDice() {
        const diceToRethrow = this.dice.getRethrowDiceIndex();
        const newDice = this.randomNumberGenerator.generateRandomNumbers(diceToRethrow.length);
        for (let i = 0; i < diceToRethrow.length; i++) {
            this.dice.changeDiceAttributesAfterRethrow(this.fiveDice[diceToRethrow[i]], newDice);
            this.fiveDice[diceToRethrow[i]] = newDice[i];
        }
    }
}

const game = new Game();