const { redis } = require('../redis-init');

const humanKey = 'count_human_dna';
const mutantKey = 'count_mutant_dna';
module.exports = {
    incrementHumans: async () => {
        const points = await redis.incr(humanKey);
        console.log(points);
    },
    incrementMutants: async () => {
        const points = await redis.incr(mutantKey);
        console.log(points);
    },
    getHumans: async () => {
        try {
            return await redis.get(humanKey);
        } catch (error) {
            return 0;
        }    
        
    },
    getMutants: async () => {
        try {
            return await redis.get(mutantKey);
        } catch (error) {
            return 0;
        } 
        
    }
}