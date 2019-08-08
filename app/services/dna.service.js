//const { redis } = require('../redis-init');
const mongoose = require('mongoose');
module.exports = {
    saveDNA: async (dna, type) => {
        if(dna instanceof Array && type  && (type == 'human' || type == 'mutant')){
            try{
                let Dna = mongoose.model('Dna');
                var newDna = new Dna({
                    dna,
                    type
                });
                return await newDna.save();
            } catch ( error ){
                console.error('error saving object')
                return null;
            }
            
        } else {
            return null;
        }
    },
    getDNA: async (dna) => {
        if(dna instanceof Array){
            let Dna = mongoose.model('Dna');
            const existDna = await Dna.findOne({dna});
            return existDna;
        } else {
            return null;
        }
        
    }
};