const Mutants = require('../logic/mutants-finder').Mutants;
const {incrementHumans, incrementMutants, getStats}  = require('../services/stats.service');
const {saveDNA, getDNA} = require('../services/dna.service');
module.exports = {
  mutant: async (req, res, next) => {
    if (!req.body.dna || !Array.isArray(req.body.dna)) {
      return res.send('An error occurred: DNA is a required paramter');
    }
    let mutants = new Mutants();
    let msg = '';
    const searchDNAInDB = await getDNA(req.body.dna);
    if(!searchDNAInDB){
      if(mutants.isMutant(req.body.dna)){
        await saveDNA(req.body.dna, 'mutant');
        await incrementMutants()
        res.status(200);
      } else {
        await saveDNA(req.body.dna, 'human');
        await incrementHumans()
        res.status(403);
      }
    } else {
      if(searchDNAInDB.type == 'human'){
        res.status(403);
      } else if(searchDNAInDB.type == 'mutant') {
        res.status(200);
      }
    }
    
    res.send(msg);
  },
  stats: (req, res, next) => {
    getStats().then( (stats) => {
      console.log(stats);
      let toReturn = ''
      if(stats){
        toReturn = {"count_mutant_dna":stats.count_mutant_dna, "count_human_dna":stats.count_human_dna, "ratio":(stats.count_mutant_dna/stats.count_human_dna)};
        res.status(200);
        res.send(toReturn);
      } else {
        toReturn = {"count_mutant_dna":0, "count_human_dna":0, "ratio":0};
        res.status(200);
        res.send(toReturn);
      }
    });
  }
};
