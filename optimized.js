var inputValidation = require('./lib/inputValidation');

var arguments = process.argv;
var number = inputValidation.getNumberFromInput(arguments);

run(number);

function run(number) {
    var numbersDividedBy8 = 0;
    var startTime = new Date();
    var totalTime = 0;

    var cp = require('child_process');
    var cpus = 4; //require('os').cpus().length;
    var loops = number / cpus;
    var start;
    var end;

    for (var i = 0; i < cpus; i++) {
        start = i * loops;
        end = (i + 1) * loops;
        cp.fork(__dirname + '/count.divisors/optimized', [start, end])
            .on('message', function (count) {

                numbersDividedBy8 += parseFloat(count);
                var time = (new Date()) - startTime;
                totalTime = time > totalTime ? time : totalTime;

                console.log('Numbers divided by 8: ' + numbersDividedBy8);
                console.log('Total time: %dms', totalTime);
            })
    }
}
