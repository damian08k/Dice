export default class Statistics {
    constructor(secondPlayerName) {
        this.initStatisticsVariables();
        this.secondPlayerName = secondPlayerName;
    }

    initStatisticsVariables() {
        this.firstColumnCells = [...document.querySelectorAll(".stats__first-column")];
        this.secondColumnCells = [...document.querySelectorAll(".stats__second-column")];
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
        console.log(evt.target)
    }
}