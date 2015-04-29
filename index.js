var inputValidation = require('./lib/inputValidation');

var arguments = process.argv;
var number = inputValidation.getNumberFromInput(arguments);

run(number);

function run(number) {

    var numbersDividedBy8 = 0;

    var fork = require('child_process').fork;
    var cpus = parseFloat(require('os').cpus().length) - 1;

    var loops = parseInt (number / cpus);
    var start;
    var end;

    var startTime = new Date();

    for (var i = 0; i < cpus; i++) {
        start = i * loops;
        end = ((i + 1) * loops) - 1;

        // add remaining numbers to last loop
        if (i === (cpus  - 1)) {
            end += (number - end);
        }

        var childProcess = fork(__dirname + '/count.divisors/optimized', [start, end]);

        childProcess.on('message', function (count) {

            numbersDividedBy8 += parseFloat(count);

        });

    }

    // display final message when main process ends
    process.on('exit', function () {
        var time = (new Date()) - startTime;
        console.log('Numbers divided by 8: ' + numbersDividedBy8);
        console.log('Total time: %dms', time);
    });

}
