var express = require('express');
let Mutants = require('../logic/mutants-finder').Mutants;

module.exports = {
  mutant: (req, res, next) => {
    if (!req.body.dna || !Array.isArray(req.body.dna)) {
      return res.send('An error occurred: DNA is a required paramter');
    }
    let mutants = new Mutants();
    if(mutants.isMutant(req.body.dna)){
      res.status(200);
    } else {
      res.status(403);
    }
    res.send();
  }
};
