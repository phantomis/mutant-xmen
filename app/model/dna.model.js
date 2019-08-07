const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DNASchema = Schema({
    dna: {
        type: Array,
        index: true 
    },
    type: {
        type: String,
        enum : ['human','mutant'],
    },
    created: { 
        type: Date,
        default: Date.now
    }
});

mongoose.model('Dna', DNASchema);