// <reference path="./../../../../dist/lightning.d.ts" />

export default class GameState extends Lightning.State {

     protected particleEmitter:Lightning.ParticleEmitter


    create() {    

        let sprite:Lightning.Sprite = new Lightning.Sprite();
        let texture:Lightning.Graphics = Lightning.Geometry.Triangle(50);
        sprite.texture = this.game.generateTexture(texture);
        sprite.x = this.game.width / 2;
        sprite.y = this.game.height / 2;
        sprite.setAnchor(0.5);
        this.add(sprite);

        /**
        1.  * creating basic tween
         */
        // let tween = this.game.tweens.create(null, sprite);
        // tween.createAnim(sprite.y, 100, 1500, 'y', Lightning.Easing.BackInOut);
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
}