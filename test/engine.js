describe('Engine', function() {

    var game; 

    it('Create New Game', function() {
        game = new Lightning.Engine(200, 200, {
        
        });
        
        expect(game instanceof Lightning.Engine).toBeTruthy();
    });

    
});