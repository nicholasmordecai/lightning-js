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
        constructor(width, height, wrapperId:string, options?:iEngineOptions) {
            super();
            this.initalise(width, height, wrapperId, this.prepareOptions(options));
        }

        private prepareOptions(options:iEngineOptions):iEngineOptions {
            let ops:iEngineOptions = {
                skipHello: options.skipHello || true,
                autoStart: options.autoStart || true,
                renderer: options.renderer || 'auto',
                resolution: options.resolution || 1, 
                scaleManeger: options.scaleManeger || true, 
                device: options.device || true,
                storage: options.storage || true,
                events: options.events || true,
                keyboard: options.keyboard || true,
                physicsLite: options.physicsLite || true,
                box2d: options.box2d || false,
                services: options.services || true,
                sockets: options.sockets || false,
                states: options.states || true,
                tweens: options.tweens || true,
                parallax: options.parallax || true,
                particles: options.particles || true,
                timer: options.timer || true,
                webfonts: options.webfonts || true,
                debug: options.debug || true,
                maths: options.maths || true,
            }
            return ops;
        }

        private initalise(width, height, wrapperId, options:iEngineOptions) {
            /**
             * Say Hello
             */
            if(options.skipHello === null || options.skipHello === undefined || options.skipHello === true) {
                this.displayInfo();                
            }
            
            /**
             * Initalise the Scale Manager
             */
            if(options.scaleManeger === null || options.scaleManeger === undefined || options.scaleManeger === true) {
                this._scaleManager = new Scale(this, width, height, 0);
            }
            
            /**
             * Initalise the Device
             */
            if(options.device === null || options.device === undefined || options.device === true) {
                this._device = new Device(this);
            }
            
            /**
             * THIS NEEDS A TIDY UP!
             */
            // setup the canvas
            let wrapper = document.createElement('div');
            wrapper.id = wrapperId || '';

            document.body.appendChild(wrapper);

            /**
             * Initalise the renderer
             */
            if(options.renderer === 'auto') {
                this._renderer = PIXI.autoDetectRenderer(width, height, {resolution: this._scaleManager.devicePixelRatio});
            } else if(options.renderer === 'canvas') {
                this._renderer = new PIXI.CanvasRenderer(width, height, {resolution: this._scaleManager.devicePixelRatio});
            } else if (options.renderer === 'webgl') {
                this._renderer = new PIXI.WebGLRenderer(width, height, {resolution: this._scaleManager.devicePixelRatio});
            } else {
                // fallback if renderer type isn't canvas / webgl / auto
                this._renderer = PIXI.autoDetectRenderer(width, height, {resolution: this._scaleManager.devicePixelRatio});
            }

            wrapper.appendChild(this._renderer.view);
            
            // call the scale manager resize throttler once to set the initial scale
            this._scaleManager.resizeThrottler(true);

            /**
             * I think this can go, but will keep it here for the time being
             */
            // this._renderer.resize(width, height);

            /**
             * Create the world
             */
            this._world = new Lightning.Group();
            this._world.interactive = true;

            /**
             * Initalise the Ticker
             */
            this._ticker = PIXI.ticker.shared;
            this._ticker.autoStart = false;
            this._ticker.add(this.update, this);

            /**
             * Initalise the Storage Manager
             */
            if(options.storage === null || options.storage === undefined || options.storage === true) {
                this._storageManager = new StorageManager();
            }

            /**
             * Initalise the Global Event Emitter
             */
            if(options.events === null || options.events === undefined || options.events === true) {
                this._eventEmitter = new EventEmitter();
            }
            
            /**
             * Initalise the Keyboard Manager
             */
            if(options.keyboard === null || options.keyboard === undefined || options.keyboard === true) {
                this._keyboardManager = new KeyboardManager(this);
            }

            /**
             * Initalise the Lite Physics
             */
            if(options.physicsLite === null || options.physicsLite === undefined || options.physicsLite === true) {
                this._physicsLite = new LitePhysicsManager(this);
            }

            /**
             * Initalise the Service Manager
             */
            if(options.services === null || options.services === undefined || options.services === true) {
                this._serviceManager = new ServiceManager(this); 
            }

            /**
             * Initalise the State Manager
             */
            if(options.states === null || options.states === undefined || options.states === true) {
                this._stateManager = new StateManager(this);
            }

            /**
             * Initalise the State Manager
             */
            if(options.tweens === null || options.tweens === undefined || options.tweens === true) {
                this._tweenManager = new TweenManeger(this);
            }

            /**
             * Start the update loop automatically
             */
            if(options.autoStart === null || options.autoStart === undefined || options.autoStart === true) {
                this.start();
            }
        }

        /**
         * @description Main entry for every update function. This is called by the ticker on every request frame update
         * 
         * @param {number} time
         * 
         * @returns {void}
         */ 
        update(time):void {
            this._renderer.render(this._world);
        }

        /**
         * @description Start the ticker
         * 
         * @returns {boolean}
         */
        public start():boolean {
            this._ticker.start();
            return true;
        }

        /**
         * @description Stop the ticker
         * 
         * @returns {boolean}
         */
        public stop():boolean {
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