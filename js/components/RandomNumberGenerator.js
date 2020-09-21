export default class RandomNumberGenerator {

    generateRandomNumbers() {
        const maxNumberOfDice = 5;
        const generateNumbers = [];

        for (let i = 0; i < maxNumberOfDice; i++) {
            generateNumbers.push(Math.floor(Math.random() * 5 + 1));
        }

        return generateNumbers;
    }
}