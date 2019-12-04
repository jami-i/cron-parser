const assert = require('assert');

const Date = require('../lib/Date.js');

describe('date parser', function() {
  
  describe("parsing", () => {
    it('can parse "*" pattern', function() {
      const type = typeof Date.tryParse("*");
      assert.ok(type === 'function');
    });

    it('can parse static number pattern 1', function() {
      const type = typeof Date.tryParse("3");
      assert.ok(type === 'function');
    });
  
    it('can parse static number pattern 31', function() {
      const type = typeof Date.tryParse("31");
      assert.ok(type === 'function');
    });

    it('can parse static number pattern', function() {
      const type = typeof Date.parse("32").value;
      assert.ok(type !== 'function');
    });

    it('can parse static number pattern', function() {
      const type = typeof Date.parse("0").value;
      assert.ok(type !== 'function');
    });
  
    it('can parse static or static pattern', function() {
      const type = typeof Date.tryParse("1,12");
      assert.ok(type === 'function');
    });
  
    it('can parse range pattern', function() {
      const type = typeof Date.tryParse("1-3");
      assert.ok(type === 'function');
    });

    it('can parse range or range pattern', function() {
      const type = typeof Date.tryParse("1-3,9-12");
      assert.ok(type === 'function');
    });

    it('can parse static or range pattern', function() {
      const type = typeof Date.tryParse("1,3-5");
      assert.ok(type === 'function');
    });

    it('can parse range or static pattern', function() {
      const type = typeof Date.tryParse("1-5,10");
      assert.ok(type === 'function');
    });
  });

  describe('validator', function() {
    describe('static number', () => {
      it('static number match', function() {
        const validator = Date.tryParse("1");
        assert.ok(validator(1) === true);
      });
  
      it('static number mismatch -1', function() {
        const validator = Date.tryParse("2");
        assert.ok(validator(1) === false);
      });
  
      it('static number mismatch +1', function() {
        const validator = Date.tryParse("2");
        assert.ok(validator(3) === false);
      });
    })

    describe("range operator", () => {
      it('range mismatch left -1', function() {
        const validator = Date.tryParse("2-9");
        assert.ok(validator(1) === false);
      });
  
      it('range match left +-0', function() {
        const validator = Date.tryParse("2-9");
        assert.ok(validator(2) === true);
      });
  
      it('range match right +-0', function() {
        const validator = Date.tryParse("2-9");
        assert.ok(validator(9) === true);
      });
  
      it('range mismatch right +1', function() {
        const validator = Date.tryParse("2-9");
        assert.ok(validator(10) === false);
      });
    });
    
    describe("or operator" ,() => {
      it('or mismatch 1', function() {
        const validator = Date.tryParse("1,11");
        assert.ok(validator(2) === false);
      });
  
      it('or mismatch 2', function() {
        const validator = Date.tryParse("1,11");
        assert.ok(validator(12) === false);
      });
  
      it('or match 1', function() {
        const validator = Date.tryParse("1,11");
        assert.ok(validator(1) === true);
      });
  
      it('or match 2', function() {
        const validator = Date.tryParse("1,11");
        assert.ok(validator(11) === true);
      });
    });

    describe("complex pattern", () => {
      it("ok", () => {
        const validator = Date.tryParse("2-3,5,7,9-11");
        assert.ok(validator(0) === false);
        assert.ok(validator(1) === false);
        assert.ok(validator(2) === true);
        assert.ok(validator(3) === true);
        assert.ok(validator(4) === false);
        assert.ok(validator(5) === true);
        assert.ok(validator(6) === false);
        assert.ok(validator(7) === true);
        assert.ok(validator(8) === false);
        assert.ok(validator(9) === true);
        assert.ok(validator(10) === true);
        assert.ok(validator(11) === true);
        assert.ok(validator(12) === false);
      })
    });
  });
});
