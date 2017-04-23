describe('Engine', function() {
    var Lightning = window.Lightning;
    var game; 

    it('Create New Game', function() {
        game = new Lightning.Engine(200, 200, 'game');
        expect(game instanceof Lightning.Engine).toBeTruthy();
    });

    
});