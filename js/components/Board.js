export default class Board {
    constructor() {
        this.diceArea = document.querySelector(".dice-area__dice");
    }

    getBoardWidth() {
        return parseInt(window.getComputedStyle(this.diceArea).getPropertyValue("width"));
    }

    getBoardHeight() {
        return parseInt(window.getComputedStyle(this.diceArea).getPropertyValue("height"));
    }

    resetBoard() {
        this.diceArea.innerHTML = "";
        this.diceArea.classList.remove("dice-area__dice--resize");
    }
}