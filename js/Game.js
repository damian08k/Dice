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
        this.diceArea = document.querySelector(".dice-area__dice");

        this.roundNumber = document.querySelector(".player-info__round-number");
        this.playerName = document.querySelector(".player-info__player-name");
        this.throws = [...document.querySelectorAll(".player-info__throw")];

        // instances of classes 
        this.randomNumberGenerator = new RandomNumberGenerator();
        this.players = new Players();

        // other variables
        this.playersNames = [];
        this.diceClasses = [
            "fa-dice-one",
            "fa-dice-two",
            "fa-dice-three",
            "fa-dice-four",
            "fa-dice-five",
            "fa-dice-six"
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

    checkOverlapping = (pX, pY, positions, dieSize) => {
        for (let i = 0; i < positions.length; i++) {
            const newPosX = pX;
            const oldPosX = positions[i].posX;
            const rightNewPosX = pX + (dieSize + 5);
            const rightOldPosX = positions[i].posX + (dieSize + 5);
            const newPosY = pY;
            const oldPosY = positions[i].posY;
            const bottomNewPosY = pY + (dieSize + 5);
            const bottomOldPosY = positions[i].posY + (dieSize + 5);

            if (rightNewPosX < oldPosX || newPosX > rightOldPosX || newPosY > bottomOldPosY || bottomNewPosY < oldPosY) {
                continue;
            }
            return true;
        }
        return false;
    }

    createAndShowDice = (fiveDice, diceArea, diceClasses) => {
        const dieSize = 52.8;
        const maxX = diceArea.offsetWidth;
        const maxY = diceArea.offsetHeight;

        let posX = 0;
        let posY = 0;
        const positions = [];

        fiveDice.forEach((die, i) => {
            const span = document.createElement("span");
            span.classList.add("dice-area__die", "fas", diceClasses[die])

            do {
                posX = Math.floor(Math.random() * (maxX - dieSize));
                posY = Math.floor(Math.random() * (maxY - dieSize));
            } while (this.checkOverlapping(posX, posY, positions, dieSize));

            positions.push({ posX, posY });

            span.style.left = positions[i].posX + "px";
            span.style.top = positions[i].posY + "px";
            diceArea.appendChild(span);
        })
    }

    firstThrowDice = () => {
        const firstFiveDice = this.randomNumberGenerator.generateRandomNumbers();
        this.createAndShowDice(firstFiveDice, this.diceArea, this.diceClasses);
        console.log(firstFiveDice);
    }
}

const game = new Game();