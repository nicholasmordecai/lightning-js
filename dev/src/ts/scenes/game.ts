export default class GameState extends Lightning.Scene {

    protected particleEmitter:Lightning.ParticleEmitter
    private _sprite:Lightnig.Sprite;

    private _start:boolean = false;

    private s1: Lightning.Sprite;
    private s2: Lightning.Sprite;

    init() {
        this.create();
    }

    create() {
        // generate data
        let data: number[] = [1, 3, 5, 4, -3, 3, 17, 6, 1, 5, 3, 2];
        let highest:number = this.highest(data);
        let lowest:number = this.lowest(data);
        let count: number = this.count(data);

        // creat the base rectangle
        let base:Lightning.Sprite = new Lightning.Sprite();
        base.texture = Lightning.Geometry.Rect(300, 150).generateCanvasTexture();
        base.x = this.game.center.x - 150;
        base.y = this.game.center.y - 75;
        this.add(base);

        // calculate the variables
        let padding:number = 0.95;
        let width: number = base.width * padding;
        let height: number = base.height * padding;
        let dataHeight = Math.abs(highest) + Math.abs(lowest);
        let ySpacing = dataHeight / height;
        console.log(count);


        // create each data point
        let c: number = 0;
        for(let i of data) {
            let dataPoint = new Lightning.Sprite(Lightning.Geometry.Circle(2).generateTexture());
            dataPoint.tint = 0xff22aa;
            // dataPoint.setAnchor(0.5);
            dataPoint.x = (width / data.length) * c;
            dataPoint.y = (i / 100) * height;
            console.log(dataPoint.y)
            base.add(dataPoint);
            c++;
        }
    }

    private highest(data) {
        let highest: number = 0;
        for(let i of data) {
            if(i > highest) {
                highest = i;
            }
        }
        return highest;
    }

    private lowest(data) {
        let lowest: number = 0;
        for(let i of data) {
            if(i < lowest) {
                lowest = i;
            }
        }
        return lowest;
    }

    private count(data) {
        let count: number = 0;
        for(let i of data) {
            count += parseInt(data);
        }
        return count;
    }

        // this.box2d.start();
        
        // let texture = Lightning.Geometry.Square(5, 5).generateTexture();

        // for(var i = 0; i < 1; i++) {
        //     let sprite = new Lightning.Sprite(texture);
        //     sprite.x = Lightning.Maths.rngInt(10, this.game.width - 10);
        //     sprite.y = Lightning.Maths.rngInt(10, this.game.height - 10);
        //     sprite.setAnchor(0.5);

        //     this.game.physics.createBody(sprite);
        //     this.add(sprite);
        // }

        // this.game.physics.createLine(100, 100, 0, 0, 100, 100);
        // this.game.physics.createLine(300, 200, 0, 0, 100, -100);
        // this.game.physics.createLine(100, 400, 0, 0, 100, 100);
        // this.game.physics.createLine(300, 400, 0, 0, 100, -100);

        
        // let sprite = new Lightning.Sprite(Lightning.Geometry.Square(50).generateTexture());
        // sprite.x = this.game.center.x;
        // sprite.y = this.game.center.y;
        // sprite.setAnchor(0.5)

        // let sprite2 = new Lightning.Sprite(Lightning.Geometry.Square(50).generateTexture());
        // sprite2.x = this.game.center.x + 10;
        // sprite2.y = this.game.center.y + 10;

        // sprite2.enableDrag(true);
        // sprite2.setAnchor(0.5)

        // this.add(sprite, sprite2)

        // let tween = this.game.tweens.create(sprite);
        // tween.importAnim('x', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]);
        // tween.start();

        // this.particleEmitter = new Lightning.ParticleEmitter(this, 0, 0);
        // this.add(this.particleEmitter);

        // generate a texture for the particle emitter
        // let texture:Lightning.Texture = Lightning.Geometry.Circle(4, 0xFC4349).generateTexture();
        // let texture2:Lightning.Texture = Lightning.Geometry.Triangle(8, 8, 0xD7DADB).generateTexture();
        // let texture2:Lightning.Texture = Lightning.Geometry.Circle(0.5, 0x6DBCDB).generateTexture();
        // let texture1:Lightning.Texture = Lightning.Geometry.Rect(2, 2, 0xFC4349, 0.5).generateTexture();
        // let texture2:Lightning.Texture = Lightning.Geometry.Rect(2, 2, 0x6DBCDB, 1).generateTexture();
        // let texture3:Lightning.Texture = Lightning.Geometry.Rect(5, 2, 0xFFFFFF, 1).generateTexture();

        // // add that texture to the particle emitter
        // this.particleEmitter.add(texture1, texture3, texture2);

        // // this.particleEmitter.enableDebug();
        // this.particleEmitter.y = this.game.height * 0.85;

        // this.particleEmitter.addToLocal = false;
        

        // this.particleEmitter.setGravity(0, 0);
        // this.particleEmitter.setVelocityRange(-0.3, 0.3, -0.3, 0.3);
        // this.particleEmitter.setScaleRange(0.4, 1.5, 0.4, 1.5);
        // this.particleEmitter.setAlphaRange(0.3, 0.3, 0.8, 0.8);
        // this.particleEmitter.setAlphaIncrement(-0.008);
        // this.particleEmitter.setInterval(5);
        
        // this.particleEmitter.setRotationIncrement(-0.1, 0.1);
        // // this.particleEmitter.setSpread(0, this.game.width, 0, this.game.height);
        // this.particleEmitter.setStrength(1);

        // // this.particleEmitter.preFillPool(200);
        // this.particleEmitter.start();

        // let data = Lightning.Maths.pointsOfCircle(this.game.center.x, this.game.center.y, 50, 50);

        // let tween = this.game.tweens.create(this.particleEmitter);
        // tween.importAnim('x', data.x);
        // tween.importAnim('y', data.y);
        

        // let tween2 = this.game.tweens.create(this.particleEmitter);
        // tween2.createAnim(this.game.width, 0, 4000, 'x', Lightning.Easing.linear);

        // tween.chain(tween2);
        // tween2.chain(tween);
        // tween.loop(-1);
        // tween.start();

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
      
    // }

    public update(time) {
        
    }
}