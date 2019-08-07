const { redis } = require('../redis-init');

const keyDNA = "evaluated_dnas";
module.exports = {
    saveDNA: async (dna) => {
        return await redis.lpush(keyDNA, JSON.stringify(dna));
    }
};