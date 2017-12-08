"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var GameState = /** @class */ (function (_super) {
    __extends(GameState, _super);
    function GameState() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._start = false;
        return _this;
    }
    GameState.prototype.create = function () {
        // this.game.physics.startPhysics();
        // for(var i = 0; i < 100; i++) {
        //     let texture = Lightning.Geometry.Triangle(20, 20).generateTexture();
        //     let sprite = new Lightning.Sprite(texture);
        //     sprite.x = Lightning.Maths.rngInt(10, this.game.width - 10);
        //     sprite.y = Lightning.Maths.rngInt(10, this.game.height - 10);
        //     sprite.setAnchor(0.5);
        //     this.game.physics.createBody(sprite, 'polygon', [0, -10, 10, 10, -10, 10]);
        //     this.add(sprite);
        // }
        // this.game.physics.createLine(100, 100, 0, 0, 100, 100);
        // this.game.physics.createLine(300, 200, 0, 0, 100, -100);
        // this.game.physics.createLine(100, 400, 0, 0, 100, 100);
        // this.game.physics.createLine(300, 400, 0, 0, 100, -100);
        var sprite = new Lightning.Sprite(Lightning.Geometry.Square(50).generateTexture());
        sprite.x = this.game.center.x;
        sprite.y = this.game.center.y;
        sprite.setAnchor(0.5);
        var sprite2 = new Lightning.Sprite(Lightning.Geometry.Square(50).generateTexture());
        sprite2.x = this.game.center.x + 100;
        sprite2.y = this.game.center.y + 100;
        sprite2.setAnchor(0.5);
        this.add(sprite, sprite2);
        var tween = this.game.tweens.create(sprite);
        tween.createAnim(0, 300, 1500, 'x', Lightning.Easing.ElasticInOut);
        tween.start();
        var tween2 = this.game.tweens.clone(tween, sprite2);
        tween2.start();
        // let gfx2 = Lightning.Geometry.Square(10);
        // gfx2.x = 580;
        // gfx2.y = 10;
        // let gfx3 = Lightning.Geometry.Square(10);
        // gfx3.x = 580;
        // gfx3.y = 380;
        // let gfx4 = Lightning.Geometry.Square(10);
        // gfx4.x = 10;
        // gfx4.y = 380;
        // let sq1 = Lightning.Geometry.Square(25);
        // this.s1 = new Lightning.Sprite(sq1.generateTexture());
        // this.s1.setAnchor(0.5);
        // this.s1.x = this.game.center.x;
        // this.s1.y = this.game.center.y;
        // this.s2 = new Lightning.Sprite(sq1.generateTexture());
        // this.s2.setAnchor(0.5);
        // this.s2.rotation = Lightning.Maths.degreesToRadians(45);
        // this.s2.x = this.game.center.x;
        // this.s2.y = this.game.center.y;
        // this.add(gfx1, gfx2, gfx3, gfx4, this.s1, this.s2);
        // setTimeout(() => {
        //     this.game.physics.lite.reset();
        //     this.game.scene.start('menu');
        // }, 5000);
        // this.game.backgroundColour = 0xe5e5e5;
        // let bigGuy = new Lightning.Sprite();
        // bigGuy.texture = Lightning.Geometry.Rect(50, 50, 0xff22aa, 1, true);
        // bigGuy.x = this.game.width / 2;
        // bigGuy.y = this.game.height / 2;
        // this.add(bigGuy);
        // bigGuy.enablePhysicsBody();
        // bigGuy.body.enableDebug();
        // bigGuy.body.static = true;
        // let cEvent = this.game.physics.lite.createCollisionEvent('t', bigGuy.body, pool.bodies);
        // cEvent.onCollide(this.onCollide, this);
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
    };
    GameState.prototype.update = function (time) {
    };
    return GameState;
}(Lightning.Scene));
exports.default = GameState;
