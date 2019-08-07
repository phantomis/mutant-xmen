const expect = require('chai').expect;
const sinon = require('sinon');
const { mutant } = require('./mutant');
const Mutants = require('../logic/mutants-finder').Mutants;
let req = {
    body: {},
};

let res = {
    sendCalledWith: '',
    statusCalledWith: '',
    send: function(arg) { 
        this.sendCalledWith = arg;
    },
    status: function(arg) { 
        this.statusCalledWith = arg;
    }
};

describe('Mutant Route', function() {
    describe('mutant() function', function() {

        before(() => {
            mutantsMock = sinon.stub(Mutants.prototype, 'isMutant');
        });
        
        after(() => {
            mutantsMock.restore();
        });

        it('should return error when is no DNA field ', function() {
            mutant(req, res);
            expect(res.sendCalledWith).to.contain('error');
        });
        it('should return error when DNA is not an array ', function() {
            let newReq = req;
            newReq.body.dna = 'NOT ARRAY';
            mutant(req, res);
            expect(res.sendCalledWith).to.contain('error');
        });
        it('should return 200 when we found a mutant', function() {
            mutantsMock.callsFake(() => true);
            let newReq = req;
            newReq.body.dna = [""];
            mutant(req, res);
            expect(res.statusCalledWith).to.be.eq(200);
        });
        it('should return 403 when we cannot found a mutant', function() {
            mutantsMock.callsFake(() => false);
            let newReq = req;
            newReq.body.dna = [""];
            mutant(req, res);
            expect(res.statusCalledWith).to.be.eq(403);
        });
    });
});