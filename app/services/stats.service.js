const mongoose = require('mongoose')
module.exports = {
    incrementHumans: async () => {
        const Stats = mongoose.model('Stats');
        const theStat = await Stats.findOne({});
        if(!theStat) {
            await new Stats({count_mutant_dna:0, count_human_dna:1 }).save();
        } else {
            await Stats.updateOne({}, { $inc: { count_human_dna: 1 } });
        }
    },
    incrementMutants: async () => {
        const Stats = mongoose.model('Stats');
        const theStat = await Stats.findOne({});
        if(!theStat) {
            await new Stats({count_mutant_dna:1, count_human_dna:0 }).save();
        } else {
            await Stats.updateOne({}, { $inc: { count_mutant_dna: 1 } });
        }
    },
    getStats: async () => {
        const stats = await mongoose.model('Stats').findOne({})   
        return stats;
    },
}