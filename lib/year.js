const P = require('parsimmon');
const {
  Any,
  Comma,
  Hyphen,
  NumberV,
  RangeV,
  OrV
} = require('./common.js');

const YearNumber = P.regexp(/(2[0-9]{3})/mi).map(Number);
const YearStatic = YearNumber.map(NumberV);
const YearRange = P.seq(YearNumber, Hyphen, YearNumber).map(RangeV);
const YearOr = P.alt(YearRange, YearStatic).sepBy(Comma).map(OrV);
const Year = P.alt(Any, YearOr);

module.exports = Year;
