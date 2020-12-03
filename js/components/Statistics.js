import Computer from "./Computer.js";

export default class Statistics {
    constructor(secondPlayerName) {
        this.initStatisticsVariables();
        this.secondPlayerName = secondPlayerName;

        this.computer = new Computer(this.upperFirstPlayerCells);
    }

    initStatisticsVariables() {
        this.firstColumnCells = [...document.querySelectorAll(".stats__first-column")];
        this.secondColumnCells = [...document.querySelectorAll(".stats__second-column")];
        this.upperFirstPlayerCells = [...document.querySelectorAll("[data-type='upperFirstPlayer']")];
        this.upperSecondPlayerCells = [...document.querySelectorAll("[data-type='upperSecondPlayer']")];
    }

    addListenersToCells() {
        if(this.secondPlayerName !== "Komputer") {
            const allCellsArray = this.firstColumnCells.concat(this.secondColumnCells);
            allCellsArray.forEach(singleCell => singleCell.addEventListener("click", evt => this.addPointsToCells(evt)));
        } else {
            this.removePointerIfOnePlayer();
            this.firstColumnCells.forEach(singleCell => singleCell.addEventListener("click", evt => this.addPointsToCells(evt)));
        }
    }

    removePointerIfOnePlayer() {
        this.secondColumnCells.forEach(singleCell => singleCell.style.cursor = "auto");
    }


    addPointsToCells(evt) {
        this.computer.getClickedCell(evt.target);
        const score = this.computer.countPlayersPoints();
        this.setScoreToTable(evt.target, score);
    }

    setScoreToTable(cell, score) {
        cell.textContent = score;
    }

}