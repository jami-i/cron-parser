const P = require('parsimmon');

const Minute = require('./minute');
const Hour = require('./hour');
const Day = require('./date');
const Month = require('./month');
const Year = require('./year');

const SP = P.whitespace;

const ValidateDate = (minute, _1, hour, _2, day, _3, month, _4, year) => {
  return (value) => {
    return minute(value.getMinutes())
      && hour(value.getHours())
      && day(value.getDate())
      && month(value.getMonth() + 1)
      && year(value.getFullYear())
  };
};

const Cron = P.seqMap(Minute, SP, Hour, SP, Day, SP, Month, SP, Year, ValidateDate);

const validator = Cron.tryParse(process.argv.slice(2).join(' '));

console.log(validator(new Date()));

module.exports = Cron;
