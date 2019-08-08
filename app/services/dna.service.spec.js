const expect = require('chai').expect;
const sinon = require('sinon');
const mongoose = require('mongoose')
const proxyquire = require('proxyquire').noCallThru();

let dnaService;
let modelStub;

describe('DNA Service', function() {
    
    beforeEach(() => {
        modelStub = sinon.stub(mongoose, 'model')        
        dnaService = proxyquire('./dna.service', {
            mongoose: {
                model: modelStub
            }
        });
    });
    
    afterEach(() => {       
        modelStub.restore();
    });

    it('should save DNA when correct params are given', async () => {
        const saveSpy = sinon.spy();
        class ModelConstructor {
            constructor(message) {
            }
        }
        ModelConstructor.prototype.save =  saveSpy;
        modelStub.returns(ModelConstructor);
        await dnaService.saveDNA(["A", "B"], 'human');
        expect(saveSpy.called).to.be.true;
    });

    it('should return the DNA for a given array', async () => {
        const findOnySpy = sinon.spy();
        modelStub.returns({findOne: findOnySpy});
        await dnaService.getDNA(["A", "B"]);
        expect(findOnySpy.called).to.be.true;
    });

    it('should return empty when there is no array ', async () => {
        const findOnySpy = sinon.spy();
        modelStub.returns({findOne: findOnySpy});
        const getDNAResult = await dnaService.getDNA({});
        expect(findOnySpy.called).to.be.false;
        expect(getDNAResult).to.be.null;

    });

});