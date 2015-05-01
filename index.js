var inputValidation = require('./lib/inputValidation');
var scheduler = require('./lib/scheduler');

var arguments = process.argv;
var number = inputValidation.getNumberFromInput(arguments);

run(number);

function run(number) {

    var numbersDividedBy8 = 0;
    var fork = require('child_process').fork;
    var cpus = parseFloat(require('os').cpus().length);
    scheduler.calculateJobs(number);
    var startTime = new Date();

    function test(job) {

        if (job) {

            var childProcess = fork(__dirname + '/count.divisors/optimized', [job.start, job.end]);

            childProcess.on('message', function (count) {
                numbersDividedBy8 += parseFloat(count);
            });

            childProcess.on('exit', function() {
                job = scheduler.getNextJob();
                test(job);
            });

        }

    }

    for (var i = 0; i < cpus; i++) {
        test(scheduler.getNextJob());
    }

    /*var job;
    while (job = scheduler.getNextJob()) {
        (function() {
            function countDivisors(number) {
                var count = 2;
                var end = Math.floor(Math.sqrt(number));
                var i;

                for (i = 2; i < end; i++) {
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

            for (var counter = job.start; counter <= job.end; counter++) {
                if (countDivisors(counter) === 8) {
                    numbersDividedBy8++;
                }
            }

        })();
    }*/

    // display final message when main process ends
    process.on('exit', function () {
        var time = (new Date()) - startTime;
        console.log('Numbers divided by 8: ' + numbersDividedBy8);
        console.log('Total time: %dms', time);
    });

}
