const expect = require('chai').expect;
const sinon = require('sinon');

const Mutants = require('../logic/mutants-finder').Mutants;
const proxyquire = require('proxyquire').noCallThru();

let mutantRouter;


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

const statsService = require('../services/stats.service');
const dnaService  = require('../services/dna.service');

let getDNAStub;

describe('Mutant Route', function() {
    describe('mutant() function', function() {

        beforeEach(() => {
            mutantsStub = sinon.stub(Mutants.prototype, 'isMutant');;
            getDNAStub = sinon.stub(dnaService,'getDNA');
            saveDNAStub = sinon.stub(dnaService,'saveDNA');

            incrementMutantsStub = sinon.stub(statsService,'incrementMutants');
            incrementHumansStub = sinon.stub(statsService,'incrementHumans')
            getStatsStub = sinon.stub(statsService,'getStats')

            mutantRouter = proxyquire('./mutant', {
                statsService: {
                    incrementMutants: incrementMutantsStub,
                    incrementHumans: incrementHumansStub,
                    getStats: getStatsStub
                },
                dnaService: {
                    getDNA: getDNAStub,
                    saveDNA: saveDNAStub
                }
            });
        });
        
        afterEach(() => {
            mutantsStub.restore();
            getDNAStub.restore();
            saveDNAStub.restore();
            incrementMutantsStub.restore();
            incrementHumansStub.restore();
            getStatsStub.restore();

        });

        it('should return error when is no DNA field ', async () => {
            await mutantRouter.mutant(req, res);
            expect(res.sendCalledWith).to.contain('error');
        });
        it('should return error when DNA is not an array ', async () => {
            let newReq = req;
            newReq.body.dna = 'NOT ARRAY';
            await mutantRouter.mutant(req, res);
            expect(res.sendCalledWith).to.contain('error');
        });
        it('should insert in database a Mutant if doesnt exist the test', async () => {
            mutantsStub.returns(true);
            getDNAStub.returns(null)
            let newReq = req;
            newReq.body.dna = [""];

            await mutantRouter.mutant(req, res);


            expect(res.statusCalledWith).to.be.eq(200);
            expect(saveDNAStub.called).to.be.true;
        });

        it('should insert in database a Human if doesnt exist the test', async () => {
            mutantsStub.returns(false);
            getDNAStub.returns(null)
            let newReq = req;
            newReq.body.dna = [""];

            await mutantRouter.mutant(req, res);


            expect(res.statusCalledWith).to.be.eq(403);
            expect(saveDNAStub.called).to.be.true;
        });

        it('should not insert in database a Mutant if doesnt exist the test', async () => {
            getDNAStub.returns({type: 'mutant'});
            let newReq = req;
            newReq.body.dna = [""];

            await mutantRouter.mutant(req, res);


            expect(res.statusCalledWith).to.be.eq(200);
            expect(saveDNAStub.called).to.be.false;
            expect(mutantsStub.called).to.be.false;
        });

        it('should not insert in database a Human if doesnt exist the test', async () => {
            getDNAStub.returns({type: 'human'});
            let newReq = req;
            newReq.body.dna = [""];

            await mutantRouter.mutant(req, res);


            expect(res.statusCalledWith).to.be.eq(403);
            expect(saveDNAStub.called).to.be.false;
            expect(mutantsStub.called).to.be.false;
        });


        it('should return the correct stats', async () => {
            getStatsStub.returns({count_mutant_dna: '40', count_human_dna: '100'});
            let newReq = req;
            newReq.body.dna = [""];

            await mutantRouter.stats(req, res);


            expect(res.sendCalledWith).to.be.eql({count_mutant_dna: 40, count_human_dna: 100, ratio: 0.4 });
        });
        it('should return an empty stat when is no data', async () => {
            getStatsStub.returns();
            let newReq = req;
            newReq.body.dna = [""];

            await mutantRouter.stats(req, res);


            expect(res.sendCalledWith).to.be.eql({count_mutant_dna: 0, count_human_dna: 0, ratio: 0 });
        });
    });
});