var inputValidation = require('./lib/inputValidation');
var scheduler = require('./lib/scheduler');

var arguments = process.argv;
var number = inputValidation.getNumberFromInput(arguments);

var fork = require('child_process').fork;
var numbersDividedBy8 = 0;
scheduler.calculateJobs(number);

run();

function run() {

    var cpus = parseFloat(require('os').cpus().length);
    var startTime = new Date();

    for (var i = 0; i < cpus; i++) {
        scheduleJob(scheduler.getNextJob());
    }

    // display final message when main process ends
    process.on('exit', function () {
        var time = (new Date()) - startTime;
        console.log('Numbers divided by 8: ' + numbersDividedBy8);
        console.log('Total time: %dms', time);
    });

}

function scheduleJob(job) {

    if (job) {

        var childProcess = fork(__dirname + '/count.divisors/optimized', [job.start, job.end]);

        childProcess.on('message', function (count) {
            numbersDividedBy8 += parseFloat(count);
        });

        childProcess.on('exit', function() {
            scheduleJob(scheduler.getNextJob());
        });

    }

}
