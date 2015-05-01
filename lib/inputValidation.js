function getNumberFromInput(arguments) {
    var input = arguments[2]; // "number" | "number^exponent"

    if (!input) {
        displayErrorMessageAndExit('Invalid number - Exiting program...');
    }

    var number = null;

    if (inputHasExponent(input)) {
        var splitInput = input.split('^');
        if (isNumber(splitInput[0]) && isNumber(splitInput[1])) {
            number = Math.pow(splitInput[0], splitInput[1]);
        }
    } else {
        if (isNumber(input)) {
            number = input;
        }
    }

    if (!number) {
        displayErrorMessageAndExit('Invalid number - Exiting program...');
    }

    return number;
}

function inputHasExponent(number) {
    return number.indexOf('^') !== -1;
}

function isNumber(number) {
    return !isNaN(parseFloat(number)) && isFinite(number);
}

function displayErrorMessageAndExit(message) {
    console.error(message);
    process.exit(1);
}

module.exports = {
    getNumberFromInput: getNumberFromInput
};