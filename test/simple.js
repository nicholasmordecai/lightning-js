describe('preflight checks', function() {
    it('tests are running', function() {
        expect(1 + 1).toBe(2);
    });

    it('window exists', function() {
        expect(window).toBeDefined(); 
    });

    it('document exists', function() {
        expect(document).toBeDefined(); 
    });

    it('lightning exist', function() {
        expect(window.Lightning).toBeDefined(); 
    });
});