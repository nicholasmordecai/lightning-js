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

            // setup the canvas
            let wrapper = document.createElement('div');
            wrapper.id = wrapperId || '';

            document.body.appendChild(wrapper);
            this._dpr = window.devicePixelRatio;
            
            this._renderer = PIXI.autoDetectRenderer(width, height, {resolution: this._dpr});
            this._renderer.autoResize = true;
            wrapper.appendChild(this._renderer.view);

            this._world = new PIXI.Container();
            this._world.scale = new PIXI.Point(1 / window.devicePixelRatio, 1 / window.devicePixelRatio);
            this._world.interactive = true;

            this._tweens = new TweenManager(this);
            this._storageManager = new StorageManager();
            this._eventEmitter = new EventEmitter();
            
            

            // let scale = window.devicePixelRatio;
            this._renderer.resize(width, height);

            // create the physicsManager 
            this._physicsManager = new PhysicsManager(this);

            // create a new services manager
            this._serviceManager = new ServiceManager(this); 

            // create the state StateManager
            this._stateManager = new StateManager(this);
            
            // init the ticker
            this._ticker = PIXI.ticker.shared;
            this._ticker.autoStart = false;
            this._ticker.add(this.update, this);
        }

        /**
         * @description Main entry for every update function. This is called by the ticker on every request frame update
         * 
         * @param {number} time
         * 
         * @returns {void}
         */ 
        update(time):void {
            this._physicsManager.update();
            this._tweens.update();
            this._stateManager.update(time);
            this._renderer.render(this._world);
        }

        /**
         * @description Start the ticker
         * 
         * @returns {boolean}
         */
        start():boolean {
            //this._ticker.start();
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
 * Implement some sort of global cache system for any kind of object
 * Implement the services manager for backend calls
 * Implement a timer service to create and keep track of timers
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
 * Need to give responsive device pixel ration some serious consideration
 * Build a built in FPS meter in debug module
 * Explore the posibility of using light ray casting?
 * Particle emitter presets??
 * Utalise isMobilejs for mobile detection
 * Build a webfont loader
 */

/**
 * TODO ORDER
 * 
 * 1. Implement a timer service to create and keep track of timers
 * 2. Implement the services manager for backend calls
 * 3. Move enableDrag function to the display object
 * 4. Build a decent Debug class
 *  4.1 Count total objects
 *  4.2 Count all textures on the GPU (possible sizes also)
 */