import Computer from "./Computer.js";

export default class Statistics {
    constructor() {
        this.initStatisticsVariables();

        this.computer = new Computer(
            this.upperFirstPlayerCells,
            this.upperSecondPlayerCells, 
            this.lowerFirstPlayerCells, 
            this.lowerSecondPlayersCells
        );
    }

    initStatisticsVariables() {
        this.upperFirstPlayerCells = [...document.querySelectorAll("[data-type='upperFirstPlayer']")];
        this.upperSecondPlayerCells = [...document.querySelectorAll("[data-type='upperSecondPlayer']")];
        this.lowerFirstPlayerCells = [...document.querySelectorAll("[data-type='lowerFirstPlayer']")];
        this.lowerSecondPlayersCells = [...document.querySelectorAll("[data-type='lowerSecondPlayer']")];
        this.upperFirstPlayerSum = document.querySelector("[data-sum='upperFirstPlayerSum']");
        this.upperSecondPlayerSum = document.querySelector("[data-sum='upperSecondPlayerSum']");
        this.lowerFirstPlayerSum = document.querySelector("[data-sum='lowerFirstPlayerSum'");
        this.lowerSecondPlayerSum = document.querySelector("[data-sum='lowerSecondPlayerSum'");
        this.firstPlayerBonus = document.querySelector("[data-bonus='firstPlayerBonus']");
        this.secondPlayerBonus = document.querySelector("[data-bonus='secondPlayerBonus']");
        this.firstPlayerTotalScore = document.querySelector("[data-total='firstPlayerTotal']");
        this.secondPlayerTotalScore = document.querySelector("[data-total='secondPlayerTotal']");
    }

    removePointerIfOnePlayer() {
        this.secondColumnCells.forEach(singleCell => singleCell.style.cursor = "auto");
    }

    addPointsToCells(evt, currentPlayer) {
        this.computer.getClickedCell(evt.target);
        const score = this.computer.countPlayersPoints(currentPlayer);
        this.setScoreToTable(evt.target, score);
    }

    addPointsToSpecialCells(currentPlayer) {
        if(currentPlayer === 1) {
            this.upperFirstPlayerSum.textContent = this.computer.getFirstPlayerUpperSum();
            this.firstPlayerBonus.textContent = this.computer.getFirstPlayerBonus();
            this.lowerFirstPlayerSum.textContent = this.computer.getFirstPlayerLowerSum();
            this.firstPlayerTotalScore.textContent = this.computer.getFirstPlayerTotalScore();
        } else {
            this.upperSecondPlayerSum.textContent = this.computer.getSecondPlayerUpperSum();
            this.secondPlayerBonus.textContent = this.computer.getSecondPlayerBonus();
            this.lowerSecondPlayerSum.textContent = this.computer.getSecondPlayerLowerSum();
            this.secondPlayerTotalScore.textContent = this.computer.getSecondPlayerTotalScore();
        }
    }

    setScoreToTable(cell, score) {
        cell.textContent = score;
    }

}