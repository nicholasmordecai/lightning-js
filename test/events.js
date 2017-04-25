describe('# Event Emitter', function() {
    var eventEmitter;
    var event;
    var subscription;
    var result;

    it('Creats event emitter', function() {
        eventEmitter = new Lightning.EventEmitter();
        expect(eventEmitter instanceof Lightning.EventEmitter).toBeTruthy();
    });

    it('Creats an event', function() {
        event = eventEmitter.create('test');
        expect(event instanceof Lightning.Event).toBeTruthy();
    });

    it('Subscribe to an event', function() {
        subscription = eventEmitter.subscribe('test', function() {
            result = 'working';
        });
        expect(eventEmitter.event('test').subscribers.length).toBe(1);
    });

    it('Should emit an event', function() {
        eventEmitter.emit('test');
        expect(result).toBe('working');
    });

    it('Should remove an event', function() {
        event.removeSubscriber(subscription);
        expect(eventEmitter.event('test').subscribers.length).toBe(0);
    });

    it('Should fail to remove an event', function() {
        var result = event.removeSubscriber(null);
        expect(result).toBe(false);
    });

    it('Should subscribe once', function() {
        subscription = eventEmitter.subscribeOnce('test', function() {
            result = 'working';
        });
        expect(subscription.once).toBe(true);
    });

    it('Should emit the subscrber once', function() {
        eventEmitter.emit('test');
        expect(eventEmitter.event('test').subscribers.length).toBe(0);
    });

    it('Should set enabled property', function() {
        event.enabled = false;
        expect(event.enabled).toBe(false);
        event.enabled = true;
    });

    it('Should get emitOnce property', function() {
        var emitOnce = event.emitOnce;
        expect(emitOnce).toBe(false);
    });

    it('Should remove subscriber from emitter', function() {
        var s = eventEmitter.subscribe('test', function(){});
        eventEmitter.unsubscribe('test', s);
        expect(eventEmitter.event('test').subscribers.length).toBe(0);
    });

    it('Should disable an event', function() {
        eventEmitter.disableEvent('test');
        expect(eventEmitter.event('test').enabled).toBe(false);
    });

    it('Should enable an event', function() {
        eventEmitter.enableEvent('test');
        expect(eventEmitter.event('test').enabled).toBe(true);
    });

    it('Should disable emitter', function() {
        eventEmitter.enabled = false;
        expect(eventEmitter.enabled).toBe(false);
    });

    it('Should get emitter enabled property', function() {
        var result = eventEmitter.enabled;
        expect(eventEmitter.enabled).toBe(false);
    })


    it('Should remove an event', function() {
        eventEmitter.remove('test');
        expect(eventEmitter.event('test')).toBe(null);
    });
});