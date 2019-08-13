class Mutants {

    /**
     * Strategy: iterate over every i,j item on the dna matrix, and check arround it the 
     * bottom left, bottom, bottom right and right value to check the equals values, if it's equal,
     * carries the counter of found items to the next i+1,j element, until we reach the counterLimit of (4)
     * equals GENS, reseting the counters and decreasing the tries.
     * 
     * Complexity of O(n^2) , but using memory to save precalculated items 
     */
    constructor(){
        this.tries = 2;
        this.mutantGenCounterLimit = 4;  
    }
    isMutant(dna){
        if (!Array.isArray(dna) ){
            return false;
        }
        this.carryCounterGens = this.createEmptyMatrix(dna);
        for(let i = 0; i < dna.length; i++ ){
            let line = dna[i].split('');
            for (let j = 0; j < line.length; j++){
                let centerGen = dna[i].charAt(j);
                
                // Check if DiagonalLeft item is equal to current item
                if(i+1 < dna.length && j-1 >= 0){
                    if(dna[i+1].charAt(j-1) == centerGen){
                        if(this.incrementAndCheckLimits(i+1, j-1,this.carryCounterGens[i][j], "dl")) return true;
                    }
                }
                // Check if Vertical item is equal to current item
                if(i+1 < dna.length && j >= 0){
                    if(dna[i+1].charAt(j) == centerGen){
                        if(this.incrementAndCheckLimits(i+1, j, this.carryCounterGens[i][j], "v")) return true;
                    }
                }
                // Check if DiagonalRight item is equal to current item
                if(i+1 < dna.length && j+1 < dna[i].length){
                    if(dna[i+1].charAt(j+1) == centerGen){
                        if(this.incrementAndCheckLimits(i+1, j+1,this.carryCounterGens[i][j], "dr")) return true;
                    }
                }
                // Check if Horizontal item is equal to current item
                if(j+1 < dna[i].length){
                    if(dna[i].charAt(j+1) == centerGen){
                        if(this.incrementAndCheckLimits(i, j+1,this.carryCounterGens[i][j], "h")) return true;
                    }
                }
            }
        }
        return false;
    }
    /*
    * Create and empty array with a structure, to carry the counter of currents values found.
    * h: number of horizontal values found
    * v: number of vertical values found
    * dl: Number of diagonal left items found ( / )
    * dr: Number of diagonal right items found ( \ )
    */
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
    
    /*
    * Increment the currents structure on the directon we tested, reset the counter if we 
    * reach the mutantGenCounterLimit. 
    * Checks if we pass the "try" limit with the current mutantGenCounterLimit, in that case we returns 
    */
    incrementAndCheckLimits(i, j, currentValue, dir){
        this.carryCounterGens[i][j][dir] = this.carryCounterGens[i][j][dir] + 1 + currentValue[dir];
        if (this.carryCounterGens[i][j][dir] >= this.mutantGenCounterLimit-1){
            this.tries -= 1;
            this.carryCounterGens[i][j][dir] = 0;
            if(this.tries == 0){
                return true;
            }
        }
        return false;
    }

}
exports.Mutants = Mutants;