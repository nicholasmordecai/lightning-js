/// <reference path="./../../reference.d.ts" />

namespace Lightning {
    export class State extends PIXI.Container {
        
        public game:Engine;
        public loader:PIXI.loaders.Loader;
        public events:EventEmitter;

        /**
         * @description State constructor
         * 
         * @param {Engine} game
         */
        constructor(game:Engine) {
            super();
            this.game = game;
            this.events = new EventEmitter();
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
        init(params):void {
            this.preload();
        }

        /**
         * @description Preload function. Used as a helper function to preload assets into the texture cache. Will skip and call the create function if there are no resources to load
         * 
         * @returns {void}
         */
        preload():void {
            if(Object.keys(this.loader.resources).length < 1) {
                this.create();
            }
        }

        /**
         * @description Create function. Called after the preload function is complete or there is nothing to preload
         * 
         * @returns {void}
         */
        create():void {

        }

        /**
         * @description Update function. This is called by the state manager on every tick
         */
        update(time:number = null):void {
            
        }

        /**
         * @description Add children to this state. Helper functions should be migrated at some point
         * 
         * @returns {boolean}
         */
        add(...params:Array<DisplayObject>):boolean {
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
        preloadError(err):void {
            console.log(err);
        }

        /**
         * @description Called when a single file has completed loading
         * 
         * @returns {void}
         */
        preloadSingle(loader:PIXI.loaders.Loader, resource):void {
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
        preloadComplete(loader, resources):void {
            this.create();
        }
    }
}