/// <reference path="./../reference.d.ts" />

namespace Lightening {
    export namespace States {
        export class PreloadState extends State {

            constructor(game:Engine) {
                super(game);
            }

            init(params) {
                this.create();
            }

            /**
             * Create function
             */
            create() {

                this.game.signals.create('preloadComplete');
                this.game.signals.add('preloadComplete', () => {
                    this.game.startState(States.GameState);
                });

                // setup the loader
                let loader = new PIXI.loaders.Loader();
                loader.on('error', this.error, this);
                loader.on('load', this.load, this);
                loader.once('complete', this.complete, this);
                
                // add all your assets here
                loader.add('assets/ball.png');
                loader.add('assets/box.jpg');

                // start the loader
                
                loader.load();
            }

            /**
             * Called if the loader produces an error
             */
            error(err) {
                console.log(err);
            }

            /**
             * Called when a single file has completed loading
             */
            load(loader:PIXI.loaders.Loader, resource) {

                // get the name of the loaded asset
                let file:string = resource.name;
                // remove the directory if you wish
                file = file.replace(/^.*[\\\/]/, '');
                
                let progress:number = resource.progressChunk;
                console.log('File:', file, 'loaded. Progress:', progress);
            }

            /**
             * Called when the loader has finished loading everything
             */
            complete() {
                this.game.signals.dispatch('preloadComplete', {});
            }
        }
    }
}