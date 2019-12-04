const assert = require('assert');

const Weekday = require('../lib/weekday.js');

describe('weekday parser', function() {
  
  describe("parsing", () => {
    it('can parse "*" pattern', function() {
      const type = typeof Weekday.tryParse("*");
      assert.ok(type === 'function');
    });
  
    it('can parse static number pattern', function() {
      const type = typeof Weekday.tryParse("0");
      assert.ok(type === 'function');
    });

    it('can parse static number pattern', function() {
      const type = typeof Weekday.parse("7").value;
      assert.ok(type !== 'function');
    });
  
    it('can parse static or static pattern', function() {
      const type = typeof Weekday.tryParse("1,6");
      assert.ok(type === 'function');
    });
  
    it('can parse range pattern', function() {
      const type = typeof Weekday.tryParse("1-3");
      assert.ok(type === 'function');
    });

    it('can parse range or range pattern', function() {
      const type = typeof Weekday.tryParse("1-3,5-6");
      assert.ok(type === 'function');
    });

    it('can parse static or range pattern', function() {
      const type = typeof Weekday.tryParse("1,3-5");
      assert.ok(type === 'function');
    });

    it('can parse range or static pattern', function() {
      const type = typeof Weekday.tryParse("1-4,6");
      assert.ok(type === 'function');
    });
  });

  describe('validator', function() {
    describe('static number', () => {
      it('static number match', function() {
        const validator = Weekday.tryParse("1");
        assert.ok(validator(1) === true);
      });
  
      it('static number mismatch -1', function() {
        const validator = Weekday.tryParse("2");
        assert.ok(validator(1) === false);
      });
  
      it('static number mismatch +1', function() {
        const validator = Weekday.tryParse("2");
        assert.ok(validator(3) === false);
      });
    })

    describe("range operator", () => {
      it('range mismatch left -1', function() {
        const validator = Weekday.tryParse("2-4");
        assert.ok(validator(1) === false);
      });
  
      it('range match left +-0', function() {
        const validator = Weekday.tryParse("2-4");
        assert.ok(validator(2) === true);
      });
  
      it('range match right +-0', function() {
        const validator = Weekday.tryParse("2-4");
        assert.ok(validator(4) === true);
      });
  
      it('range mismatch right +1', function() {
        const validator = Weekday.tryParse("2-4");
        assert.ok(validator(5) === false);
      });
    });
    
    describe("or operator" ,() => {
      it('or mismatch 1', function() {
        const validator = Weekday.tryParse("1,4");
        assert.ok(validator(2) === false);
      });
  
      it('or mismatch 2', function() {
        const validator = Weekday.tryParse("1,4");
        assert.ok(validator(5) === false);
      });
  
      it('or match 1', function() {
        const validator = Weekday.tryParse("1,5");
        assert.ok(validator(1) === true);
      });
  
      it('or match 2', function() {
        const validator = Weekday.tryParse("1,4");
        assert.ok(validator(4) === true);
      });
    });

    describe("complex pattern", () => {
      it("ok", () => {
        const validator = Weekday.tryParse("1-3,5,6");
        assert.ok(validator(0) === false);
        assert.ok(validator(1) === true);
        assert.ok(validator(2) === true);
        assert.ok(validator(3) === true);
        assert.ok(validator(4) === false);
        assert.ok(validator(5) === true);
        assert.ok(validator(6) === true);
        assert.ok(validator(7) === false);
      })
    });
  });
});
