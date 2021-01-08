import Dice from "./Dice.js";
import Players from "./Players.js";

export default class Computer {
    constructor(upperFirstCells, upperSecondCells, lowerFirstCells, lowerSecondCells) {
        this.upperFirstCells = upperFirstCells;
        this.upperSecondCells = upperSecondCells;
        this.lowerFirstCells = lowerFirstCells;
        this.lowerSecondCells = lowerSecondCells;
        this.clickedCell = "";
        this.score = 0;
        this.upperFirstPlayerScore = 0;
        this.upperSecondPlayerScore = 0;
        this.lowerFirstPlayerScore = 0;
        this.lowerSecondPlayerScore = 0;
        this.firstPlayerTotalScore = 0;
        this.secondPlayerTotalScore = 0;
        this.firstPlayerBonus = 0;
        this.secondPlayerBonus = 0;

        this.dice = new Dice();
        this.players = new Players();

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

    countPlayersPoints(currentPlayer) {
        let currentDice = this.dice.getCurrentDice();

        currentDice = this.dice.changeDiceFromClassesToNumbers(currentDice);

        this.countPointsInUpperPartOfTable(currentDice, currentPlayer);
        this.countPointsInLowerPartOfTable(currentDice, currentPlayer);
        return this.score;
    }

    countPointsInUpperPartOfTable(currentDice, currentPlayer) {
        let cellsNames = [];
        const isUpper = true;
        const count = this.countNumberOfDiceInCurrentDice(currentDice);

        if(currentPlayer === 1) {
            cellsNames = this.getCellsNames(this.upperFirstCells);
        } else if(currentPlayer === 2) {
            cellsNames = this.getCellsNames(this.upperSecondCells);
        }

        cellsNames.forEach((cellName, index) => {
            if(this.clickedCell.dataset.cell === cellName) {
                if(count.hasOwnProperty(index + 1)) {
                    const statsOption = index + 1;
                    const optionValueInDice = Object.getOwnPropertyDescriptor(count, statsOption).value;

                    this.score = statsOption * optionValueInDice;
                } else {
                    this.score = 0;
                }

                this.countSumInTable(currentPlayer, isUpper);
            }
        })
    }

    countPointsInLowerPartOfTable(currentDice, currentPlayer) {
        let cellsNames = [];
        const threeTheSameDice = 3;
        const fourTheSameDice = 4;
        const smallStraightPossibilities = ["1234", "2345", "3456"];
        const largeStraightPossibilities = ["12345", "23456"];
        const isUpper = false;

        const count = this.countNumberOfDiceInCurrentDice(currentDice);

        if(currentPlayer === 1) {
            cellsNames = this.getCellsNames(this.lowerFirstCells);
        } else if(currentPlayer === 2) {
            cellsNames = this.getCellsNames(this.lowerSecondCells);
        }

        console.log(currentDice)
        cellsNames.forEach((cellName, cellIndex) => {
            if(this.clickedCell.dataset.cell === cellName) {
                switch(cellIndex) {
                    case 0:
                        this.checkTreeOrFourTheSameDice(threeTheSameDice, count);
                        break;
                    case 1:
                        this.checkTreeOrFourTheSameDice(fourTheSameDice, count);
                        break;
                    case 2:
                        this.checkIsFull(count);
                        break;
                    case 3:
                        this.checkIsStraight(smallStraightPossibilities, count);
                        break;
                    case 4:
                        this.checkIsStraight(largeStraightPossibilities, count)
                        break;
                    case 5:
                        this.checkIsGeneral(count);
                        break;
                    case 6:
                        this.addChance(count);
                        break;
                    default:
                        console.log("default");
                        break;
                }
                this.countSumInTable(currentPlayer, isUpper);
            }
        })
    }

    countNumberOfDiceInCurrentDice(currentDice) {
        const count = {}

        for(let i = 0; i < currentDice.length; i++) {
            const x = currentDice[i];

            count[x] = count[x] ? count[x] + 1 : 1;
        }

        return count;
    }

    checkTreeOrFourTheSameDice(requireTheSameDice, count) {
        let score = 0;
        const countDice = Object.values(count);
        const isThreeOrMore = Boolean(countDice.find(value => value >= requireTheSameDice));

        if(isThreeOrMore) {
            for(const [key, value] of Object.entries(count)) {
                score += value * key;
            }
        } else {
            score = 0;
        }

        this.score = score;
    }

    checkIsFull(count) {
        const points = 25;
        const requireFirst = 3;
        const requireSecond = 2;
        const countValues = Object.values(count);
        
        if(countValues.length === 2) {
            const [firstValue, secondValue] = countValues;

            if((firstValue === requireFirst || firstValue === requireSecond)
             && 
             (secondValue === requireFirst || secondValue === requireSecond)) {
                this.score = points;
            } else {
                this.score = 0;
            }
        } else {
            this.score = 0;
        }
    }

    checkIsStraight(possibilities, count) {
        let countFalse = 0;
        const smallStraightPoints = 30;
        const largeStraightPoints = 50;
        const countKeys = Object.keys(count).join("");

        possibilities.forEach(possibility => {
            const isInclude = countKeys.includes(possibility);
            
            if(isInclude) {
                if(possibilities.length > 2) {
                    this.score = smallStraightPoints;
                } else {
                    this.score = largeStraightPoints;
                }  
            } else {
                countFalse++;
            }
        })

        if(countFalse === possibilities.length) {
            this.score = 0;
        }
    }

    checkIsGeneral(count) {
        const generalPoints = 60;
        const countKeys = Object.keys(count);

        if(countKeys.length === 1) {
            this.score = generalPoints;
        } else {
            this.score = 0;
        }
    }

    addChance(count) {
        let score = 0;

        for(const [key, value] of Object.entries(count)) {
            score += value * key;
        }
    
        this.score = score;
    }

    countSumInTable(currentPlayer, isUpper) {
        if(currentPlayer === 1) {
            if(isUpper) {
                this.upperFirstPlayerScore += this.score;
            } else {
                this.lowerFirstPlayerScore += this.score;
            }
            this.firstPlayerTotalScore = (this.upperFirstPlayerScore + this.lowerFirstPlayerScore);
        } else {
            if(isUpper) {
                this.upperSecondPlayerScore += this.score;
            } else {
                this.lowerSecondPlayerScore += this.score;
            }
            this.secondPlayerTotalScore = (this.upperSecondPlayerScore + this.lowerSecondPlayerScore);
        }

        this.addBonusPointsForPlayers();
    }

    addBonusPointsForPlayers() {
        const bonusPoints = 30;
        const requireScore = 13;

        if(this.upperFirstPlayerScore >= requireScore) {
            this.firstPlayerBonus = bonusPoints;
            this.firstPlayerTotalScore += this.firstPlayerBonus;
        } 

        if(this.upperSecondPlayerScore >= requireScore) {
            this.secondPlayerBonus = bonusPoints;
            this.secondPlayerTotalScore += this.secondPlayerBonus;
        }
    }

    getFirstPlayerUpperSum() {
        return this.upperFirstPlayerScore;
    }

    getSecondPlayerUpperSum() {
        return this.upperSecondPlayerScore;
    }

    getFirstPlayerBonus() {
        return this.firstPlayerBonus;
    }

    getSecondPlayerBonus() {
        return this.secondPlayerBonus;
    }

    getFirstPlayerLowerSum() {
        return this.lowerFirstPlayerScore;
    }

    getSecondPlayerLowerSum() {
        return this.lowerSecondPlayerScore;
    }

    getFirstPlayerTotalScore() {
        return this.firstPlayerTotalScore;
    }

    getSecondPlayerTotalScore() {
        return this.secondPlayerTotalScore;
    }

    resetScore() {
        this.score = 0;
    }
}