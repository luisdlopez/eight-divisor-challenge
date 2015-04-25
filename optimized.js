var arguments = process.argv;

var input = arguments[2]; // "number" | "number^exponent"
var number = getNumberFromInput(input);

if (!input || !number) {
    displayErrorMessageAndExit('Invalid number - Exiting program...');
}

run();

function getNumberFromInput(input) {
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

function run() {
    var numbersDividedBy8 = 0;
    var start = new Date();

    for (var counter = 1; counter <= number; counter++) {
        if (countDivisors(counter) === 8) {
            numbersDividedBy8++;
        }
    }

    var totalTime = (new Date()) - start;

    console.log(numbersDividedBy8);
    console.log('Total time: %dms', totalTime);
    process.exit(1);
}

// no longer dealing with arrays
// square root test moved outside of loop, tested only once (on last iteration number)
// about one second saved (for now)
function countDivisors(number) {
    var count = 0,
        end = Math.floor(Math.sqrt(number)),
        i;

    for (i = 1; i < end; i++) {
        if (number % i == 0) {
            count += 2;
        }
    }

    if (number % i == 0) {
        count += 2;
        if (i * i == number) { // Don't include a square root twice
            count--;
        }
    }

    return count;
}
