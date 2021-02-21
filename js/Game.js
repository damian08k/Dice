import RandomNumberGenerator from "./components/RandomNumberGenerator.js";
import Players from "./components/Players.js";
import Dice from "./components/Dice.js";
import Statistics from "./components/Statistics.js";
import Board from "./components/Board.js";
import Computer from "./components/Computer.js";

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
        this.computer = new Computer();

        this.allCells = this.firstColumnCells.concat(this.secondColumnCells);
        this.playersNames = [];
        this.fiveDice = [];
        this.throwPossibilites = 2;
        this.currentPlayer = 1;
        this.numberOfPlayers = 0;
        this.round = 1;
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
        this.numberOfPlayers = this.players.getNumberOfPlayers();
        this.playersNames = this.players.getPlayersNames(this.numberOfPlayers);
        if (this.playersNames.length !== 0) {
            this.startGameWindow.style.display = "none";
            this.mainGameContainer.style.display = "block";
            this.firstPlayerName.textContent = this.playersNames[0];
            this.secondPlayerName.textContent = this.playersNames[1];
            this.playerName.textContent = this.playersNames[0];
            this.roundNumber.textContent = this.round;
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
        console.log(this.numberOfPlayers)
        if(this.fiveDice.length === 0) {
            alert("Nie możesz wpisać wyniku jeśli nie wybrałeś kości!");
        } else {
            this.statistics.addPointsToCells(evt, this.currentPlayer);
            this.statistics.addPointsToSpecialCells(this.currentPlayer);
            if(this.playersNames[1] !== "Komputer") {
                this.setPlayerOptions(evt.target);
            } else {
                evt.target.style.pointerEvents = "none";
                this.computer.computerMove(this.secondColumnCells);
                const computerCell = this.computer.getComputerCell();
                const computerScore = this.computer.getComputerScore();
                this.statistics.setScoreToTable(computerCell, computerScore);
                const specialCells = this.statistics.getSecondPlayerCells();
                const playerScores = [
                    this.computer.getSecondPlayerUpperSum(),
                    this.computer.getSecondPlayerBonus(),
                    this.computer.getSecondPlayerLowerSum(),
                    this.computer.getSecondPlayerTotalScore()
                ]

                this.statistics.addPointsToSpecialCellsMechanism(specialCells, playerScores);
            }
            this.showNewRoundNumber();
            this.resetGameOptions();
            this.endGame();
        }
    }

    setPlayerOptions(clickedCell) {
        if(this.currentPlayer === 1) {
            this.currentPlayer = 2;
            this.removeClickPossibility(this.firstColumnCells);
            this.removeCellFromPackAfterClick(this.firstColumnCells, clickedCell);
            this.addClickPossibility(this.secondColumnCells);
        } else if(this.currentPlayer === 2) {
            this.currentPlayer = 1;
            this.removeClickPossibility(this.secondColumnCells);
            this.removeCellFromPackAfterClick(this.secondColumnCells, clickedCell);
            this.addClickPossibility(this.firstColumnCells);
        }
        this.playerName.textContent = this.playersNames[this.currentPlayer - 1];
    }

    resetGameOptions() {
        this.board.resetBoard();
        this.restoreThrowPossibilities();
        this.changeThrowButtonValues("Rzuć kośćmi!", "throw");
        this.dice.removeDiceListener();
        this.computer.resetScore();
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

    updateRoundNumber() {
        const maxRound = 13;
        this.round++;

        if(this.round <= maxRound) {
            this.roundNumber.textContent = this.round;
        }
    }

    showNewRoundNumber() {
            if(this.numberOfPlayers === 1) {
                this.updateRoundNumber();
            } else if(this.numberOfPlayers > 1) {
                if(this.currentPlayer === 1) {
                    this.updateRoundNumber();
                }
            }
    }

    removeCellFromPackAfterClick(cellsPack, clickedCell) {
        cellsPack.filter((cell, cellIndex) => {
            if(clickedCell === cell) {
                cellsPack.splice(cellIndex, 1);
            }
        })
    }

    removeClickPossibility(cellsPack) {
        cellsPack.forEach(singleCell => singleCell.style.pointerEvents = "none");
    }

    addClickPossibility(cellsPack) {
        cellsPack.forEach(singleCell => singleCell.style.pointerEvents = "auto");
    }

    checkGameResult() {
        const firstPlayerTotalScore = this.statistics.getFirstPlayerScore();
        const secondPlayerTotalScore = this.secondPlayerName.textContent !== "Komputer" ?
                                       this.statistics.getSecondPlayerScore() :
                                       this.computer.getSecondPlayerTotalScore();

        console.log(firstPlayerTotalScore, secondPlayerTotalScore)

        if(firstPlayerTotalScore === secondPlayerTotalScore) {
            return "Wynik gry to remis";
        } else if(firstPlayerTotalScore > secondPlayerTotalScore) {
            return `Wygrał gracz ${this.firstPlayerName.textContent} uzyskując ${firstPlayerTotalScore} punktów.`;
        } else if(secondPlayerTotalScore > firstPlayerTotalScore) {
            return `Wygrał gracz ${this.secondPlayerName.textContent} uzyskując ${secondPlayerTotalScore} punktów.`;
        }
    }

    endGame() {
        const gameResult = this.checkGameResult();

        if(this.round > 13) {
            window.setTimeout(() => {
                alert(`Gra skończona. ${gameResult}`);
                this.endGameReset();
            }, 300)
        }
    }

    endGameReset() {
        if(this.numberOfPlayers === 1) {
            this.computer.resetPlayerScores();
        } else if(this.numberOfPlayers === 2) {
            this.initCellsAfterTwoPlayerPlay();
        }
        this.statistics.resetPlayersStats();
        this.computer.resetComputerPossibilities();
        this.statistics.resetSpecialCellsValues();
        this.players.resetAddingPlayersArea();

        this.resetGameOptions();
        this.resetGameContainers();
        this.resetPlayersAndRound();
        
        this.addClickPossibility(this.allCells);
        
        this.allCells.forEach(cell => cell.textContent = "");
    }

    resetGameContainers() {
        this.startGameWindow.style.display = "flex";
        this.mainGameContainer.style.display = "none";
    }

    resetPlayersAndRound() {
        this.round = 1;
        this.numberOfPlayers = 0;
        this.currentPlayer = 1;
        this.playersNames = [];
    }

    initCellsAfterTwoPlayerPlay() {
        this.firstColumnCells = [...document.querySelectorAll(".stats__first-column")];
        this.secondColumnCells = [...document.querySelectorAll(".stats__second-column")];
    }
}

const game = new Game();