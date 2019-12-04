const Cron = require('./lib/');

const validator = Cron(process.argv.slice(2).join(' '));
console.log(validator(new Date()));