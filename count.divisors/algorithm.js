var PRIME_NUMBERS = require('../ressources/prime.numbers');

function countDivisors(number) {

  var countMap = [];
  var countMapCounter = 0;
  var primePosition = 0;
  var remains = number;
  var primeNumbers = PRIME_NUMBERS.getPrimeNumbers();
  var prime = primeNumbers[primePosition];
  var divisorLimit = Math.floor(Math.sqrt(number));

  while (remains > 1) {

    if (remains % prime === 0) {

      remains /= prime;
      countMap[countMapCounter] = countMap[countMapCounter] ? countMap[countMapCounter] + 1 : 1;

    } else if (prime >= divisorLimit) {

      countMapCounter++;
      countMap[countMapCounter] = 1;
      break;

    } else {

      prime = primeNumbers[++primePosition];
      countMapCounter++;

    }

  }

  return multiplyExponents(countMap);

}

function multiplyExponents(countMap) {

  var count = 1;

  for (var prime in countMap) {

    count *= (countMap[prime] + 1);

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