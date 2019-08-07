const expect = require('chai').expect;
const Mutants = require('./mutants-finder').Mutants;

describe('Mutants Finder', function() {
    describe('#isMutant()', function() {
      
        it('should return false when the array is null or empty', function() {
            let mutants = new Mutants();
            expect(mutants.isMutant()).to.be.eq(false);
        });

        it('should return false when the array is not a array', function() {
            let mutants = new Mutants();
            expect(mutants.isMutant({})).to.be.eq(false);
        });
        
        it('should return true when is a single horizontal line', () => {
            let mutants = new Mutants();
            const dnaString = ["AAAA", "BBBB"];
            expect(mutants.isMutant(dnaString)).to.be.eq(true);
        });

        it('should return false when is a single horizontal line', () => {
            let mutants = new Mutants();
            const dnaString = ["AAAAAA"];
            expect(mutants.isMutant(dnaString)).to.be.eq(false);
        });
        
        it('should return true when are two single horizontal line', () => {
            let mutants = new Mutants();
            const dnaString = ["AAAAAA", "BBBBBB"];
            expect(mutants.isMutant(dnaString)).to.be.eq(true);
        });

        it('should return false when there are all differents ', () => {
            let mutants = new Mutants();
            const dnaString = ["ATGC","CATG","ATGC","CATG"];
            expect(mutants.isMutant(dnaString)).to.be.eq(false);
        });

        it('should return true when the example DNA is given', () => {
            let mutants = new Mutants();
            const dnaString = ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"];
            expect(mutants.isMutant(dnaString)).to.be.eq(true);
        });

        it('should create an empty precalculatedMatrix', () => {
            let mutants = new Mutants();
            const dnaString = ["A"];
            const toReturn = [[
                  {
                    "dl": 0,
                    "dr": 0,
                    "h": 0,
                    "v": 0
                  }
                ]];
            expect(mutants.createEmptyMatrix(dnaString)).to.be.eql(toReturn);
        });

    });
  });