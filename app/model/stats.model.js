const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StatsSchema = Schema({
    count_mutant_dna: {
        type: Number,
        default: 0
    }, 
    count_human_dna:{
        type: Number,
        default: 0
    }
});

mongoose.model('Stats', StatsSchema);