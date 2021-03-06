const P = require('parsimmon');
const {
  Any,
  Comma,
  Hyphen,
  NumberV,
  RangeV,
  OrV
} = require('./common.js');

const MinuteNumber = P.regexp(/([1-5][0-9]|[0-9])/mi).map(Number);
const MinuteStatic = MinuteNumber.map(NumberV);
const MinuteRange = P.seq(MinuteNumber, Hyphen, MinuteNumber).map(RangeV);
const MinuteOr = P.alt(MinuteRange, MinuteStatic).sepBy(Comma).map(OrV);
const Minute = P.alt(Any, MinuteOr);

module.exports = Minute;

