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

    checkOverlapping(pX, pY, positions, maxBoardWidth, maxBoardHeight) {
        for (let i = 0; i < positions.length; i++) {
            const newPosX = pX;
            const oldPosX = positions[i].posX;
            const rightNewPosX = pX  + (this.dieSize/maxBoardWidth) * 100;
            const rightOldPosX = positions[i].posX + (this.dieSize/maxBoardWidth) * 100;
            const newPosY = pY;
            const oldPosY = positions[i].posY;
            const bottomNewPosY = pY + (this.dieSize/maxBoardHeight) * 100;
            const bottomOldPosY = positions[i].posY + (this.dieSize/maxBoardHeight) * 100;

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
        const paddingValue = 15;
        const maxBoardWidth = this.getBoardWidth();
        const maxBoardHeight = this.getBoardHeight();
        const maxPosX = maxBoardWidth - this.dieSize;
        const maxPosY = maxBoardHeight - this.dieSize;
        const maxAndMinPosXValues = (maxPosX - this.dieSize - paddingValue) + paddingValue;
        const maxAndMinPosYValues = (maxPosY - this.dieSize - paddingValue) + paddingValue;
        const maxWidthForCalculatePosX = (maxBoardWidth - this.dieSize);
        const maxHeightForCalculatePosY = (maxBoardHeight - this.dieSize);

        do {
            posX = Math.floor((Math.floor((Math.random() * maxAndMinPosXValues)))/maxWidthForCalculatePosX * 100);
            posY = Math.floor((Math.floor((Math.random() * maxAndMinPosYValues)))/maxHeightForCalculatePosY * 100);
        } while (this.checkOverlapping(posX, posY, positions, maxBoardWidth, maxBoardHeight))

        positions.push({ posX, posY });

        return positions;
    }

    createDice(die, positions, dieIndex) {
        const span = document.createElement("span");
        positions = this.addRandomPosition(positions);
        span.classList.add("dice-area__die", "fas", this.diceClasses[die]);
        span.style.left = positions[dieIndex].posX + "%";
        span.style.top = positions[dieIndex].posY + "%";
        span.setAttribute("data-die", dieIndex);
        span.setAttribute("data-choose", "noChoose");

        this.changeDiePositionAfterBreakBreakpoint(span);

        return span;
    }

    changeDiePositionAfterBreakBreakpoint(span) {
        const mobileXMediumBreakpoint = window.matchMedia("(max-width: 800px");
        const mobileLargeBreakpoint = window.matchMedia("(max-width: 1024px)");
        const breakpointsList = [mobileXMediumBreakpoint, mobileLargeBreakpoint];

        breakpointsList.forEach(breakpoint => {
            breakpoint.addListener(evt => {
                if(evt.matches) {
                    span.style.left = null;
                    span.style.top = null;
                    span.style.position = "static";
                    this.diceArea.classList.add("dice-area__dice--resize");
                }
            })
        })
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

    getCurrentDice() {
        return [...this.diceArea.querySelectorAll(".dice-area__die")];
    }

    getDiceClasses() {
        return this.diceClasses;
    }

}