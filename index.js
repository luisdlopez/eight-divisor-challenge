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

    // display final message when main process ends
    process.on('exit', function () {
        var time = (new Date()) - startTime;
        console.log('Numbers divided by 8: ' + numbersDividedBy8);
        console.log('Total time: %dms', time);
    });

}
