import Board from "./Board.js";

export default class Dice extends Board {
    constructor() {
        super();
        this.diceClasses = [
            "fa-dice-one",
            "fa-dice-two",
            "fa-dice-three",
            "fa-dice-four",
            "fa-dice-five",
            "fa-dice-six"
        ];
        this.dieSize = 52.8;
    }

    checkOverlapping(pX, pY, positions) {
        for (let i = 0; i < positions.length; i++) {
            const newPosX = pX;
            const oldPosX = positions[i].posX;
            const rightNewPosX = pX + (this.dieSize + 5);
            const rightOldPosX = positions[i].posX + (this.dieSize + 5);
            const newPosY = pY;
            const oldPosY = positions[i].posY;
            const bottomNewPosY = pY + (this.dieSize + 5);
            const bottomOldPosY = positions[i].posY + (this.dieSize + 5);

            if (rightNewPosX < oldPosX || newPosX > rightOldPosX || newPosY > bottomOldPosY || bottomNewPosY < oldPosY) {
                continue;
            }
            return true;
        }
        return false;
    }

    addRandomPosition(positions) {
        let posX = 0;
        let posY = 0;
        const maxBoardWidth = this.getBoardWidth();
        const maxBoardHeight = this.getBoardHeight();

        do {
            posX = Math.floor(Math.random() * (maxBoardWidth - this.dieSize));
            posY = Math.floor(Math.random() * (maxBoardHeight - this.dieSize));
        } while (this.checkOverlapping(posX, posY, positions));

        positions.push({ posX, posY });
        return positions;
    }

    createDice(die, positions, dieIndex) {
        const span = document.createElement("span");
        positions = this.addRandomPosition(positions);
        span.classList.add("dice-area__die", "fas", this.diceClasses[die]);
        span.style.left = positions[dieIndex].posX + "px";
        span.style.top = positions[dieIndex].posY + "px";
        span.setAttribute("data-die", dieIndex);
        span.setAttribute("data-choose", "noChoose");
        return span;
    }

    showDice(fiveDice) {
        const positions = [];
        fiveDice.forEach((die, dieIndex) => {
            const span = this.createDice(die, positions, dieIndex);
            this.diceArea.appendChild(span);
        })
    }

    changeDiceAttributes(die) {
        die.classList.toggle("dice-area__die--chose");
        die.setAttribute("data-choose", die.getAttribute("data-choose") === "chose" ? "noChoose" : "chose");
    }

    setListenersToDice() {
        this.diceArea.addEventListener("click", this.insideDiceListenerFunction);
    }

    insideDiceListenerFunction = evt => {
        const die = evt.target;
        if(die.classList.contains("dice-area__die")) {
            this.changeDiceAttributes(die);
        }
    }

    removeDiceListener() {
        this.diceArea.removeEventListener("click", this.insideDiceListenerFunction, true);
    }

    getDiceToRethrow() {
        return [...document.querySelectorAll("[data-choose='chose']")];
    }

    getRethrowDiceIndex() {
        const rethrowDice = this.getDiceToRethrow();
        const choseDiceIndex = [];

        rethrowDice.forEach(die => choseDiceIndex.push(parseInt(die.getAttribute("data-die"))));

        return choseDiceIndex;
    }

    changeDiceAttributesAfterRethrow(newDice) {
        const rethrowDice = this.getDiceToRethrow();

        for (let i = 0; i < rethrowDice.length; i++) {
            this.diceClasses.forEach(dieClassName => {
                if(rethrowDice[i].classList.contains(dieClassName)) {
                    rethrowDice[i].classList.remove(dieClassName);
                }
            })
            rethrowDice[i].classList.add(this.diceClasses[newDice[i]]);
            this.changeDiceAttributes(rethrowDice[i]);
        }
    }

    getCurrentDice() {
        return [...this.diceArea.querySelectorAll(".dice-area__die")];
    }

    changeDiceFromClassesToNumbers(dice) {
        dice.forEach((die, dieIndex) => {
            this.diceClasses.forEach((diceClass, classIndex) => {
                if(die.classList.contains(diceClass)) {
                    dice[dieIndex] = classIndex + 1;
                }
            })
        })

        return dice;
    }

    addClassesToDice(dice) {
        const newDice = [];
        for(let die = 0; die < dice.length; die++) {
            const span = document.createElement("span");
            span.classList.add("dice-area__die", "fas", this.diceClasses[dice[die]]);
            newDice.push(span);
        }
        return newDice;
    }

    getDiceClasses() {
        return this.diceClasses;
    }

}