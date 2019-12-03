const P = require("parsimmon");

const NumberV = (e) => (a) => Number(a) === Number(e);
const RangeV = ([from, _, to]) => (a) => from <= a && a <= to;
const OrV = (vs) => (a) => vs.reduce((memo, b) => memo || b(a), false);

const Any = P.string('*');
const Comma = P.string(',');
const Hyphen = P.string('-');

module.exports = {
  NumberV: NumberV,
  RangeV: RangeV,
  OrV: OrV,
  Any: Any,
  Comma: Comma,
  Hyphen: Hyphen
};
