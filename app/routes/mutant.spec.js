const expect = require('chai').expect;
const sinon = require('sinon');

const Mutants = require('../logic/mutants-finder').Mutants;
const proxyquire = require('proxyquire').noCallThru();

const statsServiceStub = {
    incrementHumans: () => {},
    incrementMutants: () => {},
    getStats: () => {},
    '@noCallThru': true,
};

const dnaServiceStub = {
    saveDNA: () => {},
    getDNA: () => {},
    '@noCallThru': true,
};

const { mutant, stats } = proxyquire('./mutant', {
    '../services/stats.service': statsServiceStub,
    '../services/dna.service': dnaServiceStub
});


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

        beforeEach(() => {
            mutantsMock = sinon.stub(Mutants.prototype, 'isMutant');
            sinon.stub(dnaServiceStub, 'getDNA').returns(Promise.resolve(null));;
        });
        
        afterEach(() => {
            mutantsMock.restore();
            getDNAMock.restore();
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
        it.only('should insert in database if doesnt exist the test', function() {
            mutantsMock.callsFake(() => true);
            //getDNAMock.returns('Not interested in the output')
            let newReq = req;
            newReq.body.dna = [""];
            mutant(req, res);
            expect(res.statusCalledWith).to.be.eq(200);
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
    describe('stats() function', function() {

        before(() => {
            mutantsMock = sinon.stub(Mutants.prototype, 'isMutant');
            res = {
                sendCalledWith: '',
                statusCalledWith: '',
                send: function(arg) { 
                    this.sendCalledWith = arg;
                },
                status: function(arg) { 
                    this.statusCalledWith = arg;
                }
            };
        });
        
        after(() => {
            mutantsMock.restore();
        });
        
        it('should return an empty estructure ', function() {
            stats(req, res);
            //expect(res.statusCalledWith).to.be.eq(200);
        });
    });
});