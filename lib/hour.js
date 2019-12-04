const P = require('parsimmon');
const {
  Any,
  Comma,
  Hyphen,
  NumberV,
  RangeV,
  OrV
} = require('./common.js');

const HourNumber = P.regexp(/(2[0-3]|1[0-9]|[0-9])/mi).map(Number);
const HourStatic = HourNumber.map(NumberV);
const HourRange = P.seq(HourNumber, Hyphen, HourNumber).map(RangeV);
const HourOr = P.alt(HourRange, HourStatic).sepBy(Comma).map(OrV);
const Hour = P.alt(Any, HourOr);

module.exports = Hour;

