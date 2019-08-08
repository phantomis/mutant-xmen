const expect = require('chai').expect;
const sinon = require('sinon');
const mongoose = require('mongoose')
const proxyquire = require('proxyquire').noCallThru();

let statsService;
let modelStub;

describe('Stats Service', function() {
    
    beforeEach(() => {
        modelStub = sinon.stub(mongoose, 'model')        
        statsService = proxyquire('./stats.service', {
            mongoose: {
                model: modelStub
            }
        });
    });
    
    afterEach(() => {       
        modelStub.restore();
    });


    it('should increment humans value', async () => {
        const updateOneSpy = sinon.spy();
        
        modelStub.returns({updateOne: updateOneSpy, findOne: () => Promise.resolve({'some': 'item'})});
        const increment = await statsService.incrementHumans({});
        expect(updateOneSpy.called).to.be.true;

    });

    it('should increment mutants value ', async () => {
        const updateOneSpy = sinon.spy();
        
        modelStub.returns({updateOne: updateOneSpy, findOne: () => Promise.resolve({'some': 'item'})});
        const increment = await statsService.incrementMutants({});
        expect(updateOneSpy.called).to.be.true;

    });

});