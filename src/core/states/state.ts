/// <reference path="./../../reference.d.ts" />

namespace Lightning {
    export class State extends PIXI.Container {
        
        protected game:Engine;
        public loader:PIXI.loaders.Loader;

        constructor(game:Engine, ...params) {
            super();
            this.game = game;
            this.loader = new PIXI.loaders.Loader();
            this.loader.onError.add(this.preloadError, this);
            this.loader.onLoad.add(this.preloadSingle, this);
            this.loader.onComplete.add(this.preloadComplete, this);
        }

        init(params) {
            this.preload();
        }

        preload() {
            if(Object.keys(this.loader.resources).length < 1) {
                this.create();
            }
        }

        create() {

        }

        update() {
            
        }

        add(...params:Array<DisplayObject>) {
            for(let i of params) {
                this.addChild(i);
            }
        }

        /**
         * Called if the loader produces an error
         */
        preloadError(err) {
            console.log(err);
        }

        /**
         * Called when a single file has completed loading
         */
        preloadSingle(loader:PIXI.loaders.Loader, resource) {
            // get the name of the loaded asset
            let file:string = resource.name;
            // remove the directory if you wish
            file = file.replace(/^.*[\\\/]/, '');
            
            let progress:number = resource.progressChunk;
        }

        /**
         * Called when the loader has finished loading everything
         */
        preloadComplete(resources) {
            this.create();
        }
    }
}