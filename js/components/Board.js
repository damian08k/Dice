export default class Board {
    constructor() {
        this.diceArea = document.querySelector(".dice-area__dice");
    }

    getBoardWidth() {
        return this.diceArea.offsetWidth;
    }

    getBoardHeight() {
        return this.diceArea.offsetHeight;
    }
}