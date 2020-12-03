import Dice from "./Dice.js";
import Players from "./Players.js";

export default class Computer {
    constructor(upperFirstCells) {
        this.upperFirstCells = upperFirstCells;
        this.clickedCell = "";
        this.score = 0;

        this.dice = new Dice();
        this.players = new Players();

        this.diceClasses = this.dice.getDiceClasses();
        this.numberOfPlayers = this.players.getNumberOfPlayers();
    }

    getClickedCell(clickedCell) {
        this.clickedCell = clickedCell;
    }

    getCellsNames(cellsStack) {
        const cellsNames = [];
        cellsStack.forEach(cell => cellsNames.push(cell.getAttribute("data-cell")));
        return cellsNames;
    }

    
    countPlayersPoints() {
        const currentDice = this.dice.getCurrentDice();
        let dieValue = 0;

        this.countPointsInUpperPartOfTable(currentDice, dieValue);
        
        return this.score;
    }

    countPointsInUpperPartOfTable(currentDice, dieValue) {
        const cellsNames = this.getCellsNames(this.upperFirstCells);

        cellsNames.forEach((cellName, index)=> {
            if(this.clickedCell.dataset.cell === cellName) {
                const numberOfDiceInCurrentCell = currentDice.filter(die => die.classList.contains(this.diceClasses[index]));
        
                this.diceClasses.forEach((dieClass, classIndex) => {
                    if(numberOfDiceInCurrentCell.length === 0) {
                        dieValue = 0;
                    } else if(numberOfDiceInCurrentCell.length > 0 && numberOfDiceInCurrentCell[0].classList.contains(dieClass)) {
                        dieValue = classIndex + 1;
                    }
                })

                const dicePointRating = numberOfDiceInCurrentCell.length;
               
                this.score = dicePointRating * dieValue;
            }
        })
    }
}