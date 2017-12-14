describe('# Storage', function() {
    var storage;

    it('Create A New Storage Class', function() {
        storage = new Lightning.StorageManager();
        expect(storage instanceof Lightning.StorageManager).toBeTruthy();
    });
});