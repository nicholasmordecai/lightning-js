describe('Maths', function() {
    it('Checks RNG Int', function() {
        let rng = Lightning.Maths.rngInt(0, 2);
        let result = false;
        if(rng >= 0 && rng <2) {
            result = true;
        }
        expect(result).toBe(true);
    });

    it('Checks RNG Float', function() {
        let rng = Lightning.Maths.rngFloat(0.5, 0.8);
        let result = false;
        if(rng >= 0.5 && rng <0.8) {
            result = true;
        }
        expect(result).toBe(true);
    });
});