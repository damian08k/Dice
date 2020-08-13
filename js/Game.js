import RandomNumberGenerator from "./components/RandomNumberGenerator.js    ";

class Game {
    constructor() {
        this.initVariables();
        this.gameMainLogic();
    }

    initVariables() {
        // from HTML structure
        this.diceThrowBtn = document.querySelector(".player-info__dice-throw");
        this.roundNumber = document.querySelector(".player-info__round-number");
        this.playerName = document.querySelector(".player-info__player-name");
        this.throws = [...document.querySelectorAll(".player-info__throw")];

        // instances of classes 
        this.randomNumberGenerator = new RandomNumberGenerator();

        // other variables
        this.players = [];
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
        this.diceThrowBtn.addEventListener("click", this.firstThrowDice);
    }

    firstThrowDice = () => {
        const firstFiveDice = this.randomNumberGenerator.generateRandomNumbers();
        console.log(firstFiveDice);
    }
}

new Game();