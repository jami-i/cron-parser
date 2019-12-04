const P = require('parsimmon');
const {
  Any,
  Comma,
  Hyphen,
  NumberV,
  RangeV,
  OrV
} = require('./common.js');

const WeekdayNumber = P.regexp(/([0-6])/mi).map(Number);
const WeekdayStatic = WeekdayNumber.map(NumberV);
const WeekdayRange = P.seq(WeekdayNumber, Hyphen, WeekdayNumber).map(RangeV);
const WeekdayOr = P.alt(WeekdayRange, WeekdayStatic).sepBy(Comma).map(OrV);
const Weekday = P.alt(Any, WeekdayOr);

module.exports = Weekday;

