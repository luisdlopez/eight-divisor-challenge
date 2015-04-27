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

module.exports = {
    getDivisors: listDivisors
};