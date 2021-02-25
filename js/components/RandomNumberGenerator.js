export default class RandomNumberGenerator {

    generateRandomNumbers(maxNumberOfDice) {
        const generateNumbers = [];
        const maxDieValue = 6;

        for (let i = 0; i < maxNumberOfDice; i++) {
            generateNumbers.push(Math.floor(Math.random() * maxDieValue));
        }

        return generateNumbers;
    }
}