import RandomNumberGenerator from "./components/RandomNumberGenerator.js";
import Players from "./components/Players.js";
import Dice from "./components/Dice.js";
import Statistics from "./components/Statistics.js";
import Board from "./components/Board.js";

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
        this.playerInfoSection = document.querySelector(".player-info");
        this.firstPlayerName = document.querySelector(".stats__first-player");
        this.secondPlayerName = document.querySelector(".stats__second-player");
        this.firstColumnCells = [...document.querySelectorAll(".stats__first-column")];
        this.secondColumnCells = [...document.querySelectorAll(".stats__second-column")];

        this.roundNumber = document.querySelector(".player-info__round-number");
        this.playerName = document.querySelector(".player-info__player-name");
        this.throws = [...document.querySelectorAll(".player-info__throw")];

        this.randomNumberGenerator = new RandomNumberGenerator();
        this.players = new Players();
        this.dice = new Dice();
        this.statistics = new Statistics();
        this.board = new Board();

        this.allCells = this.firstColumnCells.concat(this.secondColumnCells);
        this.playersNames = [];
        this.fiveDice = [];
        this.throwPossibilites = 2;
        this.currentPlayer = 1;
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
        const numberOfPlayers = this.players.getNumberOfPlayers();
        this.playersNames = this.players.getPlayersNames(numberOfPlayers);
        if (this.playersNames.length !== 0) {
            this.startGameWindow.style.display = "none";
            // this.mainGameContainer.style.display = "block";
            this.firstPlayerName.textContent = this.playersNames[0];
            this.secondPlayerName.textContent = this.playersNames[1];
            this.playerName.textContent = this.playersNames[0];
            this.removeClickPossibility(this.secondColumnCells);
            this.addListenersToCells();
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
        this.removeOnePossibilityToThrow();
        console.log(this.fiveDice);
    }

    rethrowDice() {
        const diceToRethrow = this.dice.getRethrowDiceIndex();
        if(diceToRethrow.length === 0) {
            alert("Nie możesz wykonać kolejnego rzutu, jeśli nie wybrałeś żadnych kości!");
        } else {
            const newDice = this.randomNumberGenerator.generateRandomNumbers(diceToRethrow.length);
            for (let i = 0; i < diceToRethrow.length; i++) {
                this.dice.changeDiceAttributesAfterRethrow(newDice);
                this.fiveDice[diceToRethrow[i]] = newDice[i];
            }
    
            if(this.throwPossibilites >= 0) {
                this.removeOnePossibilityToThrow();
            } 
        }
    }

    addListenersToCells() {
        if(this.playersNames[1] !== "Komputer") {
            this.cellsListener(this.allCells);
        } else {
            this.cellsListener(this.firstColumnCells);
        }
    }

    cellsListener(cellsPack) {
        cellsPack.forEach(singleCell => singleCell.addEventListener("click", this.cellsListenerFunction))
    }

    cellsListenerFunction = evt => {
        if(this.fiveDice.length === 0) {
            alert("Nie możesz wpisać wyniku jeśli nie wybrałeś kości!");
        } else {
            this.statistics.addPointsToCells(evt);
            if(this.playersNames[1] !== "Komputer") this.setPlayerOptions();
            this.resetGameOptionsAfterThrow();
        }
    }

    setPlayerOptions() {
        if(this.currentPlayer === 1) {
            this.currentPlayer = 2;
            this.removeClickPossibility(this.firstColumnCells);
            this.addClickPossibility(this.secondColumnCells);
        } else if(this.currentPlayer === 2) {
            this.currentPlayer = 1;
            this.removeClickPossibility(this.secondColumnCells);
            this.addClickPossibility(this.firstColumnCells);
        }
        this.playerName.textContent = this.playersNames[this.currentPlayer - 1];
    }

    resetGameOptionsAfterThrow() {
        this.board.resetBoard();
        this.restoreThrowPossibilities();
        this.changeThrowButtonValues("Rzuć kośćmi!", "throw");
        this.dice.removeDiceListener();
        this.fiveDice = [];
    }
    
    removeOnePossibilityToThrow() {
        this.throws[this.throwPossibilites].style.backgroundColor = "white";
        this.throwPossibilites--;
        if(this.throwPossibilites < 0) {
            this.showIfNoMoreThrows();
        }
    }

    showIfNoMoreThrows() { 
        this.diceThrowBtn.style.display = "none";
        const noMoreThrowsInfoElement = document.createElement("p");
        noMoreThrowsInfoElement.className = "player-info__no-throws-info";
        noMoreThrowsInfoElement.textContent = "Skończyły Ci się rzuty.";
        this.playerInfoSection.appendChild(noMoreThrowsInfoElement);
    }

    restoreThrowPossibilities() {
        this.throwPossibilites = 2;
        this.throws.forEach(throwPossibility => throwPossibility.style.backgroundColor = "#cf5fcf");
        const throwButtonDisplayStyle = getComputedStyle(this.diceThrowBtn).display;
        if(throwButtonDisplayStyle === "none") {
            const noMoreThrowsInfo = document.querySelector(".player-info__no-throws-info");
            this.playerInfoSection.removeChild(noMoreThrowsInfo);
            this.diceThrowBtn.style.display = "block";
        }
    }

    removeClickPossibility(cellsPack) {
        cellsPack.forEach(singleCell => singleCell.style.pointerEvents = "none");
    }

    addClickPossibility(cellsPack) {
        cellsPack.forEach(singleCell => singleCell.style.pointerEvents = "auto");
    }
}

const game = new Game();