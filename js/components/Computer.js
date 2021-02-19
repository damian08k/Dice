import Dice from "./Dice.js";
import Players from "./Players.js";
import RandomNumberGenerator from "./RandomNumberGenerator.js";

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
        this.computerScoreCell = "";

        this.dice = new Dice();
        this.players = new Players();
        this.diceGenerator = new RandomNumberGenerator();

        this.numberOfPlayers = this.players.getNumberOfPlayers();

        this.upperStatsPossibilities = [
            {
                name: "Jedynki",
                indexNo: 0,
            },
            {
                name: "Dwójki",
                indexNo: 1,
            },
            {
                name: "Trójki",
                indexNo: 2,
            },
            {
                name: "Czwórki",
                indexNo: 3,
            },
            {
                name: "Piątki",
                indexNo: 4,
            },
            {
                name: "Szóstki",
                indexNo: 5,
            }
        ];

        this.lowerStatsPossibilites = [
            {
                name: "Trzy jednakowe",
                indexNo: 0,
            },
            {
                name: "Cztery jednakowe",
                indexNo: 1,
            },
            {
                name: "Full",
                indexNo: 2,
            },
            {
                name: "Mały strit",
                indexNo: 3,
            },
            {
                name: "Duży strit",
                indexNo: 4,
            }, {
                name: "Generał",
                indexNo: 5,
            },
            {
                name: "Szansa",
                indexNo: 6,
            }
        ]
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
        const isUpper = false;
        const isComputer = false;

        const count = this.countNumberOfDiceInCurrentDice(currentDice);

        if(currentPlayer === 1) {
            cellsNames = this.getCellsNames(this.lowerFirstCells);
        } else if(currentPlayer === 2) {
            cellsNames = this.getCellsNames(this.lowerSecondCells);
        }

        cellsNames.forEach((cellName, cellIndex) => {
            if(this.clickedCell.dataset.cell === cellName) {
                this.lowerStatsCountSwitch(cellIndex, count, isComputer);
                this.countSumInTable(currentPlayer, isUpper);
            }
        })
    }

    lowerStatsCountSwitch(expression, count, isComputer) {
        let score = 0;
        const threeTheSameDice = 3;
        const fourTheSameDice = 4;
        const smallStraightPossibilities = ["1234", "2345", "3456"];
        const largeStraightPossibilities = ["12345", "23456"];

        switch(expression) {
            case 0:
                score = this.checkTreeOrFourTheSameDice(threeTheSameDice, count);
                break;
            case 1:
                score = this.checkTreeOrFourTheSameDice(fourTheSameDice, count);
                break;
            case 2:
                score = this.checkIsFull(count);
                break;
            case 3:
                score = this.checkIsStraight(smallStraightPossibilities, count);
                break;
            case 4:
                score = this.checkIsStraight(largeStraightPossibilities, count)
                break;
            case 5:
                score = this.checkIsGeneral(count);
                break;
            case 6:
                score = this.addChance(count);
                break;
            default:
                console.log("default");
                break;
        }

        if(isComputer) {
            return score;
        }
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
        return score;
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

        return this.score;
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

        return this.score;
    }

    checkIsGeneral(count) {
        const generalPoints = 60;
        const countKeys = Object.keys(count);

        if(countKeys.length === 1) {
            this.score = generalPoints;
        } else {
            this.score = 0;
        }

        return this.score;
    }

    addChance(count) {
        let score = 0;

        for(const [key, value] of Object.entries(count)) {
            score += value * key;
        }
    
        this.score = score;

        return this.score;
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

    computerMove(secondColumnCells) {
        const computerDice = this.computerThrowAndRethrow();
        const computerScores = this.countComputerScores(computerDice, this.upperStatsPossibilities, this.lowerStatsPossibilites);
        const maxComputerScore = this.checkMaxComputerScore(computerScores);
        this.addComputerPoint(secondColumnCells, computerScores, maxComputerScore);
        this.removePossibility();
    }

    computerThrowAndRethrow() {
        const diceToGenerate = 5;
        let computerDice = this.diceGenerator.generateRandomNumbers(diceToGenerate);
        computerDice = this.dice.addClassesToDice(computerDice);
        computerDice = this.dice.changeDiceFromClassesToNumbers(computerDice); 
        computerDice = this.countNumberOfDiceInCurrentDice(computerDice);

        return computerDice;
    }

    countComputerScores(count, upperStatsPossibilities, lowerStatsPossibilites) {
        const computerScoresObject = {};
        this.countComputerUpperStatsScores(computerScoresObject, upperStatsPossibilities, count);
        this.countComputerLowerStatsScores(computerScoresObject, lowerStatsPossibilites, count);

        return computerScoresObject;
    }

    countComputerUpperStatsScores(scoresObject, statsPossibilites, count) {
        for(let upperIndex = 0; upperIndex < statsPossibilites.length; upperIndex++) {
            for(const [key, value] of Object.entries(count)) {
                if(key - 1 === statsPossibilites[upperIndex].indexNo) {
                    const score = key * value;
                    this.createProperty(scoresObject, statsPossibilites[upperIndex].name, score);
                }
            }
        }   
    }

    countComputerLowerStatsScores(scoresObject, statsPossibilites, count) {
        const isComputer = true;
        let score = 0;
        
        for(let lowerIndex = 0; lowerIndex < statsPossibilites.length; lowerIndex++) {
            score = this.lowerStatsCountSwitch(statsPossibilites[lowerIndex].indexNo, count, isComputer)
            this.createProperty(scoresObject, statsPossibilites[lowerIndex].name, score)
        }

    }

    createProperty(scoresObject, propertyName, score) {
        Object.defineProperty(scoresObject, propertyName, {
            value: score,
            enumerable: true,
        })
    }

    checkMaxComputerScore(computerScores) {
        const scoresValues = Object.values(computerScores);
        let maxValue = scoresValues[0];

        for(let i = 0; i < scoresValues.length; i++) {
            if(scoresValues[i] > maxValue) maxValue = scoresValues[i];
        }

        return maxValue;
    }

    addComputerPoint(secondColumnCells, computerScores, maxComputerScore) {
        for(let [key, value] of Object.entries(computerScores)) {
            if(value === maxComputerScore) {
                secondColumnCells.forEach(cell => {
                    if(cell.dataset.row === key) {
                        this.computerScoreCell = cell;
                        this.score = value;
                        
                        const row = this.computerScoreCell.dataset.row;
                        if(this.checkPackIncludes(row, this.upperStatsPossibilities)) {
                            this.countSumInTable(2, true);
                        } else {
                            this.countSumInTable(2, false);
                        }
                    }
                })
                break;
            }
        }
    }

    removePossibility() {
        const row = this.computerScoreCell.dataset.row;
        const isUpperPossibility = this.checkPackIncludes(row, this.upperStatsPossibilities);
        const isLowerPossibility = this.checkPackIncludes(row, this.lowerStatsPossibilites);

        if(isUpperPossibility) {
            this.removePossibilityOption(row, this.upperStatsPossibilities);
        } else if(isLowerPossibility) {
            this.removePossibilityOption(row, this.lowerStatsPossibilites);
        }
    }

    checkPackIncludes(row, cellsPack) {
        return cellsPack.some(isRow => isRow.name === row);
    }

    removePossibilityOption(row, cellsPack) {
        const removeElementIndex = cellsPack.map(isRow => isRow.name).indexOf(row);
        cellsPack.splice(removeElementIndex, 1);
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

    getComputerCell() {
        return this.computerScoreCell;
    }

    getComputerScore() {
        return this.score;
    }

    resetScore() {
        this.score = 0;
    }
}