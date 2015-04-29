// no longer dealing with arrays
// square root test moved outside of loop, tested only once (on last iteration number)
// about one second saved (for now)
function countDivisors(number) {
    var count = 0;
    var end = Math.floor(Math.sqrt(number));
    var i;

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

(function run() {
    var start = parseFloat(process.argv[2]);
    var end = parseFloat(process.argv[3]);
    var numbersDividedBy8 = 0;

    for (var counter = start; counter <= end; counter++) {
        if (countDivisors(counter) === 8) {
            numbersDividedBy8++;
        }
    }

    process.send(numbersDividedBy8);
    process.exit(1);
})();