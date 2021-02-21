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
            const specialCells = [
                this.upperFirstPlayerSum,
                this.firstPlayerBonus,
                this.lowerFirstPlayerSum,
                this.firstPlayerTotalScore
            ];

            const playerScores = [
                this.computer.getFirstPlayerUpperSum(),
                this.computer.getFirstPlayerBonus(),
                this.computer.getFirstPlayerLowerSum(),
                this.computer.getFirstPlayerTotalScore()
            ];

            this.addPointsToSpecialCellsMechanism(specialCells, playerScores);
        } else {
            const specialCells = [
               ...this.getSecondPlayerCells()
            ];

            const playerScores = [
                this.computer.getSecondPlayerUpperSum(),
                this.computer.getSecondPlayerBonus(),
                this.computer.getSecondPlayerLowerSum(),
                this.computer.getSecondPlayerTotalScore()
            ]

            console.log(this.computer.getFirstPlayerTotalScore());

            this.addPointsToSpecialCellsMechanism(specialCells, playerScores);
        }
    }

    addPointsToSpecialCellsMechanism(specialCells, playerScores) {
        const [upperSum, bonus, lowerSum, total] = specialCells;
        const [upperScore, bonusScore, lowerScore, totalScore] = playerScores;

        upperSum.textContent = upperScore;
        bonus.textContent = bonusScore;
        lowerSum.textContent = lowerScore;
        total.textContent = totalScore;
    }

    setScoreToTable(cell, score) {
        cell.textContent = score;
    }

    getSecondPlayerCells() {
        return [
            this.upperSecondPlayerSum,
            this.secondPlayerBonus,
            this.lowerSecondPlayerSum,
            this.secondPlayerTotalScore
        ];
    }

    getFirstPlayerScore() {
        return this.computer.getFirstPlayerTotalScore();
    }

    getSecondPlayerScore() {
        return this.computer.getSecondPlayerTotalScore();
    }

    resetPlayersStats() {
        this.computer.resetPlayerScores();
    }

    resetSpecialCellsValues() {
        this.upperFirstPlayerSum.textContent = 0;
        this.upperSecondPlayerSum.textContent = 0;
        this.lowerFirstPlayerSum.textContent = 0;
        this.lowerSecondPlayerSum.textContent = 0;
        this.firstPlayerBonus.textContent = 0;
        this.secondPlayerBonus.textContent = 0;
        this.firstPlayerTotalScore.textContent = 0;
        this.secondPlayerTotalScore.textContent = 0;
    }

}