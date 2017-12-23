/// <reference path="./../reference.d.ts" />

namespace Lightning {

    /**
     * @todo
     * It would be nice, to be able to override any asset to not be included with the loaderItems count.
     * This would allow you to load essential audio / assets, and the complete be called whilst you continue loading the rest
     */
    export class Loader extends PIXI.loaders.Loader {

        private _loaderItems: number;
        private _itemsLoaded: number;
        private _soundsToDecode: number;
        private _soundsDecoded: number;
        private _allDecoded: boolean;
        private _events: EventEmitter;

        private game: Engine;

        constructor(game?: Engine) {
            super();

            if(game) {
                this.game = game;
            }

            this._events = new EventEmitter();
            this._events.create('load');
            this._events.create('error');
            this._events.create('complete');
            this._events.create('start');
            this._events.create('assetsComplete');
            // this._events.create('audioDecoded');

            this._loaderItems = 0;
            this._itemsLoaded = 0;
            this._soundsToDecode = 0;
            this._soundsDecoded = 0;
            this._allDecoded = false;

            this.onError.add(this.preloadError, this);
            this.onLoad.add(this.preloadSingle, this);
            this.onComplete.add(this.preloadComplete, this);
        }

        /**
         * @description Add an item to the asset loader.
         * If you pass an array of url's, the preloader will assume that this is meant
         * for the audio preload
         * 
         * @param name 
         * @param {string | string[]} url where to load the item from
         * @param {iLoaderOptions} options pass options to force the preload
         * 
         * @returns {void}
         * 
         * @example
         * ~~~
         * // inside of a scene
         * 
         * this.loader.add("dude", "assets/dude_1.png");
         * 
         * // load an audio file (automaically gets added to this.game.audio)
         * this.loader.add("track1", "assets/audio/track_1.mp3");
         * 
         * // load an audio file with multiple file extensions (for cross browser support)
         * this.loader.add("track2", ["assets/audio/track_2.mp3", "assets/audio/track_2.ogg", "assets/audio/track_2.wav"]);
         * 
         * ~~~
         */
        public addResource(name: string, url: string[], options?: iLoaderOptions): void {
            if(url instanceof Array) {
                if(this.game) {
                    this.addAudio(name, url);
                }
            } else {
                // let ext = url.substring(url.lastIndexOf("."));
                // if(ext === '.mp3' || ext === 'mp4' || ext === 'ogg' || ext === 'wav') {
                //     if(this.game) {
                //         this.addAudio(name, url);
                //     }
                // } else {
                    this._loaderItems ++;
                    this.addToLoader(name, url, options);
                // }
            }
        }

        /**
         * @description Begin the loader
         * 
         * @returns {void}
         * 
         * @example 
         * ~~~
         * // inside of a scene
         * this.loader.start();
         * 
         * ~~~
         */
        public start() {
            this.load();
            this.events.emit('start', this);
        }

        private addAudio(name, url) {
            this._loaderItems++;
            var sound = this.game.audio.load(name, url);

            sound.once("load", () => {
                this.audioLoaded(sound)
            });
        }

        private addToLoader(name: string, url: string | string[], options?: iLoaderOptions) {
            let newOpts: any = {};
            if(options) {
                if(options.xhrType) {
                    switch (options.xhrType) {
                        case "default":
                            newOpts.xhrType = PIXI.loaders.Resource.XHR_RESPONSE_TYPE.DEFAULT
                            break;
                        case "buffer":
                            newOpts.xhrType = PIXI.loaders.Resource.XHR_RESPONSE_TYPE.BUFFER
                            break;
                        case "blob":
                            newOpts.xhrType = PIXI.loaders.Resource.XHR_RESPONSE_TYPE.BLOB
                            break;
                        case "document":
                            newOpts.xhrType = PIXI.loaders.Resource.XHR_RESPONSE_TYPE.DOCUMENT
                            break;
                        case "json":
                            newOpts.xhrType = PIXI.loaders.Resource.XHR_RESPONSE_TYPE.JSON
                            break;
                        case "text":
                            newOpts.xhrType = PIXI.loaders.Resource.XHR_RESPONSE_TYPE.TEXT
                            break;
                    }
                }
    
                if(options.loadType) {
                    switch (options.loadType) {
                        case "audio":
                            newOpts.loadType = PIXI.loaders.Resource.LOAD_TYPE.AUDIO
                            break;
                        case "image":
                            newOpts.loadType = PIXI.loaders.Resource.LOAD_TYPE.IMAGE
                            break;
                        case "video":
                            newOpts.loadType = PIXI.loaders.Resource.LOAD_TYPE.VIDEO
                            break;
                        case "xhr":
                            newOpts.loadType = PIXI.loaders.Resource.LOAD_TYPE.XHR
                            break;
                    }
                }
    
                if(options.metadata) {
                    newOpts.metadata = options.metadata;
                }
            }
            super.add(name, url, newOpts);
        }

        private preloadError(err) {
            this.events.emit('error', this, err);
        }

        private audioLoaded(sound) {
            // console.log('audioLoaded');
            this._itemsLoaded++;
            this.checkLoadingStatus();
        }

        private preloadSingle(loader:PIXI.loaders.Loader, resource) {
            // console.log('preloadSingle', resource);
            this._itemsLoaded++;
            this.checkLoadingStatus(resource);            
        }

        private preloadComplete(loader, resources) {
            // console.log('assets complete');
            this.events.emit("assetsComplete", this);
        }

        private checkLoadingStatus(resources?) {
            console.log(this._loaderItems, this._itemsLoaded, this._loaderItems === this._itemsLoaded);
            if(this._loaderItems === this._itemsLoaded) {
                // console.log('everything complete')
                this.events.emit("complete", this);
            }
        }

        /**
         * @description Returns an instance of the event emitter class
         * 
         * @returns {EventEmitter} eventEmitter
         */
        public get events(): EventEmitter {
            return this._events;
        }

        /**
         * @description returns a count of the resource items to load including audio
         * 
         * @returns {number} loaderItems
         */
        public get resourceCount() {
            return this._loaderItems
        }
    }
}