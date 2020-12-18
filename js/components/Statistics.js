import Computer from "./Computer.js";

export default class Statistics {
    constructor() {
        this.initStatisticsVariables();

        this.computer = new Computer(this.upperFirstPlayerCells, this.upperSecondPlayerCells);
    }

    initStatisticsVariables() {
        this.upperFirstPlayerCells = [...document.querySelectorAll("[data-type='upperFirstPlayer']")];
        this.upperSecondPlayerCells = [...document.querySelectorAll("[data-type='upperSecondPlayer']")];
    }

    removePointerIfOnePlayer() {
        this.secondColumnCells.forEach(singleCell => singleCell.style.cursor = "auto");
    }

    addPointsToCells(evt, currentPlayer) {
        this.computer.getClickedCell(evt.target);
        const score = this.computer.countPlayersPoints(currentPlayer);
        this.setScoreToTable(evt.target, score);
    }

    setScoreToTable(cell, score) {
        cell.textContent = score;
    }

}