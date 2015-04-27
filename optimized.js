var inputValidation = require('./lib/inputValidation');
var countDivisors = require('./count.divisors/optimized');

var arguments = process.argv;
var number = inputValidation.getNumberFromInput(arguments);

run(number);

function run(number) {
    var numbersDividedBy8 = 0;
    var start = new Date();

    for (var counter = 1; counter <= number; counter++) {
        if (countDivisors.getDivisors(counter) === 8) {
            numbersDividedBy8++;
        }
    }

    var totalTime = (new Date()) - start;

    console.log(numbersDividedBy8);
    console.log('Total time: %dms', totalTime);
    process.exit(1);
}
