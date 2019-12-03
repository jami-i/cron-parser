const minuteValidatorFactory = require('./lib/minute');


const validator = minuteValidatorFactory('1-3,5-6');

console.log(validator('3'));
console.log(validator('4'));
console.log(validator('5'));

