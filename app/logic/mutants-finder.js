class Mutants {

    constructor(){
        this.tries = 2;
    }
    isMutant(dna){
        if (!Array.isArray(dna) ){
            return false;
        }
        this.carryCounterGens = this.createEmptyMatrix(dna);
        for(let i = 0; i < dna.length; i++ ){
            let line = dna[i].split('');
            for (let j = 0; j < line.length; j++){
                let centerNumber = dna[i].charAt(j);
                
                if(i+1 < dna.length && j-1 >= 0){
                    if(dna[i+1].charAt(j-1) == centerNumber){
                        if(this.incrementAndCheckLimits(i+1, j-1,this.carryCounterGens[i][j], "dl")) return true;
                    }
                }
    
                if(i+1 < dna.length && j >= 0){
                    if(dna[i+1].charAt(j) == centerNumber){
                        if(this.incrementAndCheckLimits(i+1, j, this.carryCounterGens[i][j], "v")) return true;
                    }
                }
    
                if(i+1 < dna.length && j+1 < dna[i].length){
                    if(dna[i+1].charAt(j+1) == centerNumber){
                        if(this.incrementAndCheckLimits(i+1, j+1,this.carryCounterGens[i][j], "dr")) return true;
                    }
                }
    
                if(j+1 < dna[i].length){
                    if(dna[i].charAt(j+1) == centerNumber){
                        if(this.incrementAndCheckLimits(i, j+1,this.carryCounterGens[i][j], "h")) return true;
                    }
                }
            }
        }
        return false;
    }

    createEmptyMatrix(dna){
        let array = [];
        for(let i=0;i<dna.length;i++){
            array[i] = [];
            for(let j=0;j<dna[0].length;j++){
                array[i][j]={h:0, v:0 , dl:0, dr:0 };
            }
        }
        return array;
    }
    
    incrementAndCheckLimits(i, j, currentValue, dir){
        this.carryCounterGens[i][j][dir] = this.carryCounterGens[i][j][dir] + 1 + currentValue[dir];
        if (this.carryCounterGens[i][j][dir] >= 3){
            this.tries -= 1;
            this.carryCounterGens[i][j][dir] = 0;
            if(this.tries == 0){
                return true;
            }
        }
        return false;
    }

    // incrementCarryCounter()
}
exports.Mutants = Mutants;