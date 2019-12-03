const P = require('parsimmon');
const {
  Any,
  Comma,
  Hyphen,
  NumberV,
  RangeV,
  OrV
} = require('./common.js');

const DateNumber = P.regexp(/(3[01]|[12][0-9]|[1-9])/mi).map(Number);
const DateStatic = DateNumber.map(NumberV);
const DateRange = P.seq(DateNumber, Hyphen, DateNumber).map(RangeV);
const DateOr = P.alt(DateRange, DateNumber).sepBy(Comma).map(OrV);
const DateE = P.alt(Any, DateOr);

const dateValidatorFactory = (expression) => DateE.tryParse(expression);

module.exports = DateE;

