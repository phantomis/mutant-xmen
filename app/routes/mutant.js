const Mutants = require('../logic/mutants-finder').Mutants;
const {incrementHumans, incrementMutants, getHumans, getMutants}  = require('../services/stats.service');
const {saveDNA} = require('../services/dna-recorder.service');
module.exports = {
  mutant: (req, res, next) => {
    if (!req.body.dna || !Array.isArray(req.body.dna)) {
      return res.send('An error occurred: DNA is a required paramter');
    }
    let mutants = new Mutants();
    let msg = '';
    if(mutants.isMutant(req.body.dna)){
      try{
        saveDNA(req.body.dna);
        incrementMutants();
      } catch(error){
        msg = 'Error incrementing stats';
      }
      res.status(200);
    } else {
      try{
        saveDNA(req.body.dna);
        incrementHumans();
      } catch(error){
        msg = 'Error incrementing stats';
      }
      res.status(403);
    }
    res.send(msg);
  },
  stats: (req, res, next) => {
    Promise.all([getHumans(), getMutants()]).then( (values) => {
      const humans = !values[0]? 0: parseInt(values[0]);
      const mutants = !values[1]? 0: parseInt(values[1]);
      const ratio = (humans == 0 || mutants == 0)? 0: (mutants/humans);
      const toReturn = {"count_mutant_dna":mutants, "count_human_dna":humans, "ratio":ratio};
      res.status(200);
      res.send(toReturn);
    }).catch( error => {
      res.send(error);
    });
    
  }
};
