export default class GameState extends Lightning.State {

     protected particleEmitter:Lightning.ParticleEmitter
     private _sprite:Lightnig.Sprite;

     private _start:boolean = false;

    create() {

        setTimeout(() => {
            this.game.physics.lite.reset();
            this.game.states.start('menu');
        }, 5000);

        this.game.physics.lite.enablePhysics();
        let texture:Lightning.Texture =  Lightning.Geometry.Rect(5, 5).generateCanvasTexture();
        let pool = this.game.physics.lite.createPool('test');

        for(var i = 0; i < 30; i++) {
            let sprite = new Lightning.Sprite();
            sprite.texture = texture;
            sprite.x = Lightning.Maths.rngFloat(0, this.game.width);            
            sprite.y = Lightning.Maths.rngFloat(0, this.game.height);
            this.add(sprite);

            sprite.enablePhysicsBody();
            pool.add(sprite.body);
            sprite.body.enableDebug();

            sprite.body.velocity.x = Lightning.Maths.rngFloat(-5, 5);
            sprite.body.velocity.y = Lightning.Maths.rngFloat(-5, 5);
            sprite.body.collideOnWorldBounds = true;
            sprite.body.gravityEnabled = true;
            sprite.body.restitution = 0.5;
        }

        let bigGuy = new Lightning.Sprite();
        bigGuy.texture = Lightning.Geometry.Rect(50, 50).generateCanvasTexture();
        bigGuy.x = this.game.width / 2;
        bigGuy.y = this.game.height / 2;
        this.add(bigGuy);

        bigGuy.enablePhysicsBody();
        bigGuy.body.enableDebug();
        bigGuy.body.static = true;

        let cEvent = this.game.physics.lite.createCollisionEvent('t', bigGuy.body, pool.bodies);

        cEvent.onCollide(this.onCollide, this);

        
        /**
        1.  * creating basic tween
         */
        // let tween = this.game.tweens.create(sprite);
        // tween.createAnim(sprite.y, 100, 1500, 'y', Lightning.Easing.BackInOut);
        // console.log(tween);
        // tween.start();

        // sprite.enableInput();
        // sprite.input.onClick(() => {
        //     this.game.goFullScreen();
        // });
        

        /**
        11.  * setting FPS
         */
        // let tween = this.game.tweens.create(null, sprite);
        // tween.setFps(5);
        // tween.createAnim(sprite.y, 100, 300, 'y', Lightning.Easing.BackInOut);
        // console.log(tween);
        // tween.start();

        /**
        1.  * creating basic tween by importing frame data
         */
        // let tween = this.game.tweens.create(null, sprite);
        // tween.importAnim('x', [0, 5, 10, 20, 25, 30, 50, 60, 80, 100, 110, 100, 90, 80, 70, 60, 50, 40,30,20,10,9,8,7,6,5,4,3,2,1,0]);
        // console.log(tween);
        // tween.start();

        /**
        2.  * Create multiple anim tween
         */ 
        // let tween:Lightning.Tween = this.game.tweens.create(null, sprite);
        // tween.createAnim(sprite.y, 100, 500, 'y', Lightning.Easing.ExpoInOut);
        // tween.createAnim(sprite.x, 100, 500, 'x', Lightning.Easing.ExpoInOut);
        // tween.start();

        /**
        3.  * Chaining Tweens
         */
        // let tween:Lightning.Tween = this.game.tweens.create(null, sprite);
        // tween.createAnim(sprite.y, 100, 500, 'y', Lightning.Easing.ExpoInOut);

        // let tween2:Lightning.Tween = this.game.tweens.create(null, sprite);
        // tween2.createAnim(sprite.x, 100, 500, 'x', Lightning.Easing.ExpoInOut);

        // tween.chain(tween2);
        // tween.start();

        /**
        4.  * Chaining Multiple Tweens
         */
        //  let low:number = this.game.height / 2 - 150;
        //  let high:number = this.game.height / 2;
        //  let tween:Lightning.Tween = this.game.tweens.create(null, sprite);
        //  tween.createAnim(high, low, 500, 'y', Lightning.Easing.ExpoInOut);

        //  let tween2:Lightning.Tween = this.game.tweens.create(null, sprite);
        //  tween2.createAnim(low, high, 500, 'y', Lightning.Easing.ExpoInOut);

        //  tween.chain(tween2);
        //  tween2.chain(tween);
        //  tween.start();

        /**
        5.  * Looping Tweens
         */
        // let tween:Lightning.Tween = this.game.tweens.create(null, sprite);
        // tween.createAnim(sprite.y, 100, 500, 'y', Lightning.Easing.ExpoInOut);
        // tween.loops = 5;
        // tween.start();

        /**
        6.  * Infinite Looping Tweens
         */
        // let tween:Lightning.Tween = this.game.tweens.create(null, sprite);
        // tween.createAnim(sprite.y, 100, 500, 'y', Lightning.Easing.ExpoInOut);
        // tween.loops = -1;
        // tween.start();

        /**
        7. * Tween Events
         */
        // let tween:Lightning.Tween = this.game.tweens.create(null, sprite);
        // tween.createAnim(sprite.y, 100, 500, 'y', Lightning.Easing.ExpoInOut);

        // tween.subscribe('start', () => {
        //     console.log('tween started');
        // });

        // tween.subscribe('complete', () => {
        //     console.log('tween completed');
        // });

        // tween.start();

        /**
         * Full list of events:
         * start
         * pause
         * tick
         * loop
         * complete
         * reset
         * destroy
         */

         /**
         8.  * Pause a tween
          */

        // let tween:Lightning.Tween = this.game.tweens.create(null, sprite);
        // tween.createAnim(sprite.y, 100, 500, 'y', Lightning.Easing.ExpoInOut);
        // tween.loops = -1;
        // tween.start();

        // setTimeout(() => {
        //     tween.pause(true);
        // }, 1000);

        // setTimeout(() => {
        //     tween.pause(false);
        // }, 2000);

        /**
         9. * Move To
         */
        // let tween:Lightning.Tween = this.game.tweens.create(null, sprite);
        // tween.createAnim(sprite.y, 100, 500, 'y', Lightning.Easing.ExpoInOut);
        // tween.moveTo(Math.floor(tween.length / 2));
        // tween.start();



        /**
        10. * Event Emitters
         */

        // // Create a new event emitter
        // let events = new Lightning.EventEmitter();

        // // Create a new event
        // events.create('bang');

        // // Subscribe to the event
        // events.subscribe('bang', (params) => {
        //     console.log('boom')
        // });

        // // Subscribe once to the event. This function callback will be removed once it has been triggered
        // events.subscribeOnce('bang', (params) => {
        //     console.log('boom once');
        // });

        // // emit the event
        // events.emit('bang');
        // events.emit('bang', 'some', 'params', 'to', 'pass');



        /**
        11.  * Game Storage
         */

    //     // set a new item
    //     this.game.storage.setItem('test', 12345);

    //     // retrieve an item
    //    let value = this.game.storage.getItem('test');

    //    // Remove an item
    //    this.game.storage.removeItem('test');

    //    // Remove all items
    //    this.game.storage.removeAll();

    //    // Force no use of local storage
    //    this.game.storage.forceNoLocalStorage = true;


    //    /**
    //   12.   * Custom Local Storage
    //     * 
    //     * If you want to have multiple storage objects, you can instantiate your own
    //     */

    //     let customStorage = new Lightning.StorageManager();
    //     /**
    //      * you can pass true / false to set the force no local storage
    //      * it defaults to false
    //      * then you can use this as you would the game storage
    //      */

    //     customStorage.setItem('test', 67890);
    //     customStorage.getItem('test');
        // ... //
      
    }

    private onCollide(obj1, obj2) {
        console.log('hi')
    }
}