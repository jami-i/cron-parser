const P = require('parsimmon');

const res = P.string("a").parse("a");

console.log(res);

