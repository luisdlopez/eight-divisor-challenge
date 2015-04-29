var jobs = [];

function calculateJobs(number) {
    // distribute a percentage of the total job to processes
    var loops = parseInt (number * 0.05);
    var start;
    for (start = 1; start <= number; start += loops) {
        jobs.push({
            start: start,
            end: (start + loops)
        });
    }
    // fix last loop in case it's bigger than number
    var last = jobs[jobs.length-1];
    if (last.end > number) {
        last.end = number;
    }
}

function getNextJob() {
    return jobs.shift(); // returns undefined when jobs is empty
}

module.exports = {
    calculateJobs: calculateJobs,
    getNextJob: getNextJob
};