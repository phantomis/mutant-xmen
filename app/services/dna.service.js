//const { redis } = require('../redis-init');
const mongoose = require('mongoose')
module.exports = {
    saveDNA: async (dna, type) => {
        let Dna = mongoose.model('Dna');
        var newDna = new Dna({
            dna,
            type
        });
        return await newDna.save();
        //return await redis.lpush(keyDNA, JSON.stringify(dna));
    },
    getDNA: async (dna) => {
        let Dna = mongoose.model('Dna');
        const existDna = await Dna.findOne({dna});
        return existDna;
    }
};