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
        constructor(width:number, height:number, options?:iEngineOptions) {
            super();
            this.initialize(width, height, this.prepareOptions(options));
        }

        private prepareOptions(options:iEngineOptions):iEngineOptions {
            if(options === undefined || options === null) {
                options = {
                    rendererOptions: {},
                    plugins: {}
                };
            } else {
                if(options.rendererOptions === undefined) options.rendererOptions = {};
                if(options.plugins === undefined) options.plugins = {};
            }
            

            let ops:iEngineOptions = {
                skipHello: options.skipHello || true,
                autoStart: options.autoStart || true,
                renderer: options.renderer || 'auto',
                rendererOptions: {
                    view: options.rendererOptions.view || null,
                    transparent: (typeof options.rendererOptions.transparent === "undefined" ? true : options.rendererOptions.transparent),
                    antialias: options.rendererOptions.antialias || false,
                    preserveDrawingBuffer: options.rendererOptions.preserveDrawingBuffer || false,
                    backgroundColor: options.rendererOptions.backgroundColor || 0x000000,
                    clearBeforeRender: options.rendererOptions.clearBeforeRender || true,
                    forceCanvas: options.rendererOptions.forceCanvas || false,
                    roundPixels: options.rendererOptions.roundPixels || false,
                    forceFXAA: options.rendererOptions.forceFXAA || false,
                    legacy: options.rendererOptions.legacy || false,
                },
                divID: options.divID || null,
                plugins: {
                    scaleManeger: options.plugins.scaleManeger || true, 
                    device: options.plugins.device || true,
                    storage: options.plugins.storage || true,
                    events: options.plugins.events || true,
                    keyboard: options.plugins.keyboard || true,
                    physicsLite: options.plugins.physicsLite || true,
                    box2d: options.plugins.box2d || false,
                    services: options.plugins.services || true,
                    sockets: options.plugins.sockets || false,
                    states: options.plugins.states || true,
                    tweens: options.plugins.tweens || true,
                    parallax: options.plugins.parallax || true,
                    particles: options.plugins.particles || true,
                    timer: options.plugins.timer || true,
                    webfonts: options.plugins.webfonts || true,
                    debug: options.plugins.debug || true,
                    maths: options.plugins.maths || true,
                }
            }

            return ops;
        }

        private initialize(width, height, options:iEngineOptions) {

            /**
             * Say Hello
             */
            if(options.skipHello === null || options.skipHello === undefined || options.skipHello === true) {
                this.displayInfo();                
            }
            
            /**
             * Initalise the Scale Manager
             */
            if(options.plugins.scaleManeger === null || options.plugins.scaleManeger === undefined || options.plugins.scaleManeger === true) {
                this._scaleManager = new Scale(this, width, height, 0);
            }
            
            /**
             * Initalise the Device
             */
            if(options.plugins.device === null || options.plugins.device === undefined || options.plugins.device === true) {
                this._device = new Device(this);
            }
            
            /**
             * THIS NEEDS A TIDY UP!
             */
            // setup the canvas
            let wrapper = document.createElement('div');
            wrapper.id = options.divID || '';

            document.body.appendChild(wrapper);

            /**
             * Initalise the renderer
             */
            options.rendererOptions.resolution = options.rendererOptions.resolution || this._scaleManager.devicePixelRatio;

            if(options.renderer === 'auto') {
                this._renderer = PIXI.autoDetectRenderer(width, height, options.rendererOptions);
            } else if(options.renderer === 'canvas') {
                this._renderer = new PIXI.CanvasRenderer(width, height, options.rendererOptions);
            } else if (options.renderer === 'webgl') {
                this._renderer = new PIXI.WebGLRenderer(width, height, options.rendererOptions);
            } else {
                // fallback if renderer type isn't canvas / webgl / auto
                this._renderer = PIXI.autoDetectRenderer(width, height, options.rendererOptions);
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
            if(options.plugins.storage === null || options.plugins.storage === undefined || options.plugins.storage === true) {
                this._storageManager = new StorageManager();
            }

            /**
             * Initalise the Global Event Emitter
             */
            if(options.plugins.events === null || options.plugins.events === undefined || options.plugins.events === true) {
                this._eventEmitter = new EventEmitter();
            }
            
            /**
             * Initalise the Keyboard Manager
             */
            if(options.plugins.keyboard === null || options.plugins.keyboard === undefined || options.plugins.keyboard === true) {
                this._keyboardManager = new KeyboardManager(this);
            }

            /**
             * Initalise the Lite Physics
             */
            if(options.plugins.physicsLite === null || options.plugins.physicsLite === undefined || options.plugins.physicsLite === true) {
                this._physicsLite = new LitePhysicsManager(this);
            }

            /**
             * Initalise the Service Manager
             */
            if(options.plugins.services === null || options.plugins.services === undefined || options.plugins.services === true) {
                this._serviceManager = new ServiceManager(this); 
            }

            /**
             * Initalise the State Manager
             */
            if(options.plugins.states === null || options.plugins.states === undefined || options.plugins.states === true) {
                this._sceneManager = new SceneManager(this);
            }

            /**
             * Initalise the State Manager
             */
            if(options.plugins.tweens === null || options.plugins.tweens === undefined || options.plugins.tweens === true) {
                this._tweenManager = new TweenManeger(this);
            }

            /**
             * Start the update loop automatically
             */
            if(options.autoStart === null || options.autoStart === undefined || options.autoStart === true) {
                this.start();
            }

            // need to wrap in options
            this._audioManager = new AudioManager(this);
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
 * Implement an animations class for extending pixi animations
 * Move enableDrag function to the display object
 * Particle emitter clear pool
 * Particle emitter add to world instead of child of the emitter
 * Super Light Sprite 
 * Think about how to implement a light sprite for particles so they dont take up so much performance. It sucks on safari!
 * Particle emitter make a pre-create class that lets you store pooled sprited before the state is started
 * Think about making a debug module that's a container in it's own right. It should accept x number of text values
 *   and sort through them accordingly, ensuring nothing is ever overlapped
 * Explore the possibility of using light ray casting?
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
 * 4. Allow particles to be added to stage, not to particle emitter... or to take into consideration their respective positions
 * 
 * 
 */