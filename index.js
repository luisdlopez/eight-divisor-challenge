var inputValidation = require('./lib/inputValidation');
var scheduler = require('./lib/scheduler');

var arguments = process.argv;
var number = inputValidation.getNumberFromInput(arguments);

var numbersDividedBy8 = { count: 0 };
scheduler.calculateJobs(number);

run();

function run() {

    var cpus = parseFloat(require('os').cpus().length);
    var startTime = new Date();

    for (var i = 0; i < cpus; i++) {
        scheduler.scheduleJob(scheduler.getNextJob(), numbersDividedBy8);
    }

    // display final message when main process ends
    process.on('exit', function () {
        var time = (new Date()) - startTime;
        console.log('Numbers divided by 8: ' + numbersDividedBy8.count);
        console.log('Total time: %dms', time);
    });

}
