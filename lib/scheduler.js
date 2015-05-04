var fork = require('child_process').fork;
var jobs = [];

function calculateJobs(number) {

  // distribute a percentage of the total job to processes
  var loops = parseInt(number * 0.10);
  var start;

  for (start = 1; start <= number; start += loops) {

    jobs.push({
      start: start,
      end: (start + loops - 1)
    });

  }

  // fix last loop in case it's bigger than number
  var last = jobs[jobs.length - 1];

  if (last.end > number) {

    last.end = number;

  }
}

function getNextJob() {

  return jobs.shift(); // returns undefined when jobs is empty

}

function scheduleJob(job, numbersDividedBy8) {

  if (job) {

    var childProcess = fork(__dirname + '/../count.divisors/optimized', [job.start, job.end]);

    childProcess.on('message', function(count) {

      numbersDividedBy8.count += parseFloat(count);

    });

    childProcess.on('exit', function() {

      scheduleJob(getNextJob(), numbersDividedBy8);

    });

  }

}

module.exports = {
  calculateJobs: calculateJobs,
  getNextJob: getNextJob,
  scheduleJob: scheduleJob
};