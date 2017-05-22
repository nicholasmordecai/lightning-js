/// <reference path="./../reference.d.ts" />

namespace Lightning {

    export class Engine extends EngineHelper {
        
        /**
         * @description Engine constructor
         * 
         * @param {number} width
         * @param {number} height
         * @param {string} canvasId
         */
        constructor(width, height, wrapperId:string = null) {
            super();

            this.displayInfo();
            this._scaleManager = new Scale(this, width, height);
            this._device = new Device(this);

            // setup the canvas
            let wrapper = document.createElement('div');
            wrapper.id = wrapperId || '';

            document.body.appendChild(wrapper);

            this._renderer = PIXI.autoDetectRenderer(width, height, {resolution: this._scaleManager.devicePixelRatio});

            wrapper.appendChild(this._renderer.view);
            
            this._scaleManager.resizeThrottler(true);
            this._scaleManager.alignVertically();

            this._world = new Lightning.Group();
            this._world.interactive = true;

            this._storageManager = new StorageManager();
            this._eventEmitter = new EventEmitter();

            // init the ticker
            this._ticker = PIXI.ticker.shared;
            this._ticker.autoStart = false;
            this._ticker.add(this.update, this);

            // create the physicsManager 
            // this._physicsManager = new PhysicsManager(this);
            this._physicsLite = new LitePhysicsManager(this);

            // create a new services manager
            this._serviceManager = new ServiceManager(this); 

            // create the state StateManager
            this._stateManager = new StateManager(this);

            // create instance of tween manager
            this._tweenManager = new TweenManeger(this);

            this.start();
        }

        /**
         * @description Main entry for every update function. This is called by the ticker on every request frame update
         * 
         * @param {number} time
         * 
         * @returns {void}
         */ 
        update(time):void {
            this._stateManager.update(time);
            this._renderer.render(this._world);
        }

        /**
         * @description Start the ticker
         * 
         * @returns {boolean}
         */
        start():boolean {
            this._ticker.start();
            return true;
        }

        /**
         * @description Stop the ticker
         * 
         * @returns {boolean}
         */
        stop():boolean {
            this._ticker.stop();
            return true;
        }
    }
}

/**
 * TODOS
 * Implement some sort of socket connectivity manager
 * Write some nice transitions for the state manager
 * Implement an animatins class for extending pixi animations
 * Move enableDrag function to the display object
 * Particle emitter clear pool
 * Particle emitter add to world instead of child of the emitter
 * Super Light Sprite 
 * Think about how to implement a light sprite for particles so they dont take up so much performance. It sucks on safari!
 * Particle emitter make a pre-create class that lets you store pooled sprited before the state is started
 * Think about making a debug module that's a container in it's own right. It should accept x number of text values
 *   and sort through them accordinly, ensuring nothing is ever overlapped
 * Explore the posibility of using light ray casting?
 * Particle emitter presets??
 * Build a webfont loader
 * Think about how best to implement some kind of camera system
 */

/**
 * TODO ORDER
 * 
 * 2. Comprehensive Scale Manager
 * 3. Re-configure how states work
 *      1. Not happy with having to call funtions when manually overriding them
 * 
 */