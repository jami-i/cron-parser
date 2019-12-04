const P = require('parsimmon');
const {
  Any,
  Comma,
  Hyphen,
  NumberV,
  RangeV,
  OrV
} = require('./common.js');

const MonthNumber = P.regexp(/(1[0-2]|[1-9])/mi).map(Number);
const MonthStatic = MonthNumber.map(NumberV);
const MonthRange = P.seq(MonthNumber, Hyphen, MonthNumber).map(RangeV);
const MonthOr = P.alt(MonthRange, MonthStatic).sepBy(Comma).map(OrV);
const Month = P.alt(Any, MonthOr);

module.exports = Month;

