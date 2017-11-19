/// <reference path="./../../reference.d.ts" />

namespace Lightning {
    export class Scene extends Lightning.Group {
        
        public game:Engine;
        public loader:PIXI.loaders.Loader;
        public events:EventEmitter;

        protected _key:string;

        /**
         * @description scene constructor
         * 
         */
        constructor() {
            super(); 
        }

        public construct(game:Engine) {
            this.game = game;
            this.events = new EventEmitter();
            // this.events.create('update');
            this.loader = new PIXI.loaders.Loader();
            this.loader.onError.add(this.preloadError, this);
            this.loader.onLoad.add(this.preloadSingle, this);
            this.loader.onComplete.add(this.preloadComplete, this);
        }

        /**
         * @description Initalization function
         * 
         * @param {Array} params
         * 
         * @returns {void}
         */
        public init(params):void {
            this.preload();
        }

        /**
         * @description Preload function. Used as a helper function to preload assets into the texture cache. Will skip and call the create function if there are no resources to load
         * 
         * @returns {void}
         */
        public preload():void {
            // if there aren't any resources to upload, then skip straight to the create function
            if(Object.keys(this.loader.resources).length < 1) {
                this.create();
            }
        }

        public prepare():void {

        }

        /**
         * @description Create function. Called after the preload function is complete or there is nothing to preload
         * 
         * @returns {void}
         */
        public create():void {

        }

        /**
         * @description Update function. This is called by the scene manager on every tick
         */
        public update(time:number = null):void {
            // this.events.emit('update', time);
        }

        /**
         * @description Add children to this scene. Helper functions should be migrated at some point
         * 
         * @returns {boolean}
         */
        public add(...params:Array<DisplayObject>):boolean {
            for(let i of params) {
                this.addChild(i);
            }

            return true;
        }

        /**
         * @description Called if the loader produces an error
         * 
         * @returns {void}
         */
        public preloadError(err):void {
            console.log(err);
        }

        /**
         * @description Called when a single file has completed loading
         * 
         * @returns {void}
         */
        public preloadSingle(loader:PIXI.loaders.Loader, resource):void {
            // get the name of the loaded asset
            let file:string = resource.name;
            // remove the directory if you wish
            file = file.replace(/^.*[\\\/]/, '');
            
            let progress:number = resource.progressChunk;
        }

        /**
         * @description Called when the loader has finished loading everything
         * 
         * @returns {void}
         */
        public preloadComplete(loader, resources):void {
            this.create();
        }

        public get key() {
            return this._key;
        }

        public set key(val:string) {
            this._key = val;
        }
    }
}