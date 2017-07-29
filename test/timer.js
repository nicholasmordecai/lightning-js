describe('# Timer', function() {

    var game = new Lightning.Engine(200, 200, 'game');
    var timer;

    it('Create New Timer', function() {
        timer = new Lightning.Timer(game);
        expect(timer instanceof Lightning.Timer).toBeTruthy();
    });

    it('Should get emitted', function(done) {
        var result = 0;
        timer.events.subscribe('tick', function() {
            result = 10;
        }, this);

        setTimeout(function() {
            expect(result).toBe(10);
            done();
        }, 1200);
    });

    it('Should start the timer', function() {
        timer.start();
        expect(timer.active).toBe(true);
    });

    it('Should stop the timer', function() {
        timer.stop();
        expect(timer.active).toBe(false);
    });

    it('Should reset the timer', function() {
        timer.reset();
        expect(timer._currentTime).toBe(0);
        expect(timer._lastTick).toBe(0);
    });

    it('Should get the active property', function() {
        timer.active = true;
        expect(timer.active).toBe(true);
    });

    it('Should get the loop property', function() {
        expect(timer.loop).toBe(true);
    });

    it('Should get the autoDestroy property', function() {
        expect(timer.autoDestroy).toBe(false);
    });

    it('Should get the interval property', function() {
        expect(timer.interval).toBe(1000);
    });

    it('Should set the active property', function() {
        timer.active = false;
        expect(timer.active).toBe(false);
    });

    it('Should set the loop property', function() {
        timer.loop = false;
        expect(timer.loop).toBe(false);
    });

    it('Should set the autoDestroy property', function() {
        timer.autoDestroy = true;
        expect(timer.autoDestroy).toBe(true);
    });

    it('Should set the interval property', function() {
        timer.interval = 500;
        expect(timer.interval).toBe(500);
    });

    it('Should get the local event emitter', function() {
        expect(timer.events instanceof Lightning.EventEmitter).toBeTruthy();
    });

    it('Should destroy the timer', function() {
        timer.destroy();
        expect(timer.active).toBe(null);
    });
});