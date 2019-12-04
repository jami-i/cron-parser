const assert = require('assert');

const Year = require('../lib/year.js');

describe('year parser', function() {
  
  describe("parsing", () => {
    it('can parse "*" pattern', function() {
      const type = typeof Year.tryParse("*");
      assert.ok(type === 'function');
    });
  
    it('can parse static number pattern', function() {
      const type = typeof Year.tryParse("2019");
      assert.ok(type === 'function');
    });
  
    it('can parse static or static pattern', function() {
      const type = typeof Year.tryParse("2019,2020");
      assert.ok(type === 'function');
    });
  
    it('can parse range pattern', function() {
      const type = typeof Year.tryParse("2019-2020");
      assert.ok(type === 'function');
    });

    it('can parse range or range pattern', function() {
      const type = typeof Year.tryParse("2016-2017,2019-2020");
      assert.ok(type === 'function');
    });

    it('can parse static or range pattern', function() {
      const type = typeof Year.tryParse("2017,2019-2020");
      assert.ok(type === 'function');
    });

    it('can parse range or static pattern', function() {
      const type = typeof Year.tryParse("2016-2017,2020");
      assert.ok(type === 'function');
    });
  });

  describe('validator', function() {
    describe('static number', () => {
      it('static number match', function() {
        const validator = Year.tryParse("2019");
        assert.ok(validator(2019) === true);
      });
  
      it('static number mismatch -1', function() {
        const validator = Year.tryParse("2019");
        assert.ok(validator(2018) === false);
      });
  
      it('static number mismatch +1', function() {
        const validator = Year.tryParse("2019");
        assert.ok(validator(2018) === false);
      });
    })

    describe("range operator", () => {
      it('range mismatch left -1', function() {
        const validator = Year.tryParse("2019-2020");
        assert.ok(validator(2018) === false);
      });
  
      it('range match left +-0', function() {
        const validator = Year.tryParse("2019-2020");
        assert.ok(validator(2019) === true);
      });
  
      it('range match right +-0', function() {
        const validator = Year.tryParse("2019-2020");
        assert.ok(validator(2020) === true);
      });
  
      it('range mismatch right +1', function() {
        const validator = Year.tryParse("2019-2020");
        assert.ok(validator(2021) === false);
      });
    });
    
    describe("or operator" ,() => {
      it('or mismatch 1', function() {
        const validator = Year.tryParse("2019,2020");
        assert.ok(validator(2018) === false);
      });
  
      it('or mismatch 2', function() {
        const validator = Year.tryParse("2019,2020");
        assert.ok(validator(2021) === false);
      });
  
      it('or match 1', function() {
        const validator = Year.tryParse("2019,2020");
        assert.ok(validator(2019) === true);
      });
  
      it('or match 2', function() {
        const validator = Year.tryParse("2019,2020");
        assert.ok(validator(2020) === true);
      });
    });

    describe("complex pattern", () => {
      it("ok", () => {
        const validator = Year.tryParse("2009-2010,2016,2018,2020-2021");
        assert.ok(validator(2008) === false);
        assert.ok(validator(2009) === true);
        assert.ok(validator(2010) === true);
        assert.ok(validator(2011) === false);
        assert.ok(validator(2015) === false);
        assert.ok(validator(2016) === true);
        assert.ok(validator(2017) === false);
        assert.ok(validator(2018) === true);
        assert.ok(validator(2019) === false);
        assert.ok(validator(2020) === true);
        assert.ok(validator(2021) === true);
        assert.ok(validator(2022) === false);
      })
    });
  });
});
