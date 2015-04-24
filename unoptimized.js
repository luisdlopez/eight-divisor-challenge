var arguments = process.argv;

var argument = arguments[2];

if(argumentIsNull(argument)) {
    console.error('Invalid number - Exiting program...');
    process.exit(1);
}

var number;

if(argumentHasExponent(argument)) {
    // TODO: more functions!
    number = argument.split('^');
    number = Math.pow(number[0], number[1]);
} else {
    number = argument;
}

var numbersDividedBy8 = 0;

for (var counter = 1; counter <= number; counter++) {
    if (listDivisors(counter).length === 8) {
        numbersDividedBy8++;
    }
}

console.log(numbersDividedBy8);
process.exit(1);

function argumentIsNull(number) {
    return !number;
}

function argumentHasExponent(number) {
    return number.indexOf('^') !== -1;
}

function isNumber(number) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function listDivisors(number) {
    if (number < 1)
        throw "Argument error";

    var small = [];
    var large = [];
    var end = Math.floor(Math.sqrt(number));
    for (var i = 1; i <= end; i++) {
        if (number % i == 0) {
            small.push(i);
            if (i * i != number)  // Don't include a square root twice
                large.push(number / i);
        }
    }
    large.reverse();
    return small.concat(large);
}
