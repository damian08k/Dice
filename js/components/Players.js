export default class Players {
    constructor() {
        this.initPlayersVariables();
        this.countPlayers();
    }

    initPlayersVariables() {
        this.numberOfPlayers = document.querySelector(".choose-players__count-players");
        this.plus = document.querySelector(".choose-players__plus-ico");
        this.minus = document.querySelector(".choose-players__minus-ico");
        this.firstPlayerName = document.querySelector("[data-player='one']");
        this.secondPlayerElements = document.querySelectorAll("[data-player='two']");
    }

    addSecondPlayer(numberOfPlayers) {
        if (numberOfPlayers === 2) {
            this.secondPlayerElements.forEach(element => element.style.display = "block")
        } else {
            this.secondPlayerElements.forEach(element => element.style.display = "none")
        }
    }

    changeNumberOfPlayers(sign, numberOfPlayers, addRemovePlayers) {
        if (sign === addRemovePlayers[0]) {
            numberOfPlayers < 2 ? numberOfPlayers++ : null;
        } else {
            numberOfPlayers > 1 ? numberOfPlayers-- : null;
        }
        this.numberOfPlayers.textContent = numberOfPlayers;

        this.addSecondPlayer(numberOfPlayers);
    }

    countPlayers() {
        let numberOfPlayers = 1;
        const addRemovePlayers = [this.plus, this.minus];
        addRemovePlayers.forEach(sign => {
            sign.addEventListener("click", () => this.changeNumberOfPlayers(sign, numberOfPlayers, addRemovePlayers))
        })
    }

    getNumberOfPlayers() {
        return parseInt(this.numberOfPlayers.textContent);
    }

    getPlayersNames(num) {
        let names = [];
        const firstPlayerName = this.firstPlayerName.value;
        let secondPlayerName = "";

        if(num === 2) {
            if(this.secondPlayerElements[1].value === "Komputer") {
                alert("Drugi gracz nie może nazywać się Komputer!");
                this.clearPlayersNamesValues(num);
                return names;
            } else {
                secondPlayerName = this.secondPlayerElements[1].value;
            }
        } else {
            secondPlayerName = "Komputer";
        }

        names = this.checkPlayersNamesLength(firstPlayerName, secondPlayerName, names, num);

        return names;
    }

    checkPlayersNamesLength(firstPlayerName, secondPlayerName, names, num) {
        if(firstPlayerName.length > 0 && firstPlayerName.length <= 8 && secondPlayerName.length > 0 && secondPlayerName.length <= 8) {
            names.push(firstPlayerName, secondPlayerName);
        } else {
            alert("Nazwa zawodnika powinna mieć od 1 do maksymalnie 8 znaków długości!");
            this.clearPlayersNamesValues(num);
        }
        return names;
    }

    clearPlayersNamesValues(num) {
        this.firstPlayerName.value = "";
        num === 2 ? this.secondPlayerElements[1].value = "" : null;
    }

}