/// <reference path="./../reference.d.ts" />

namespace Game {
    export namespace States {
        export class PreloadState extends Game.State {

            constructor(game:Game.Engine) {
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
                    new Game.States.MenuState(this.game);
                });

                let sContainer = new PIXI.Container();
                this.addChild(sContainer);

                let padding = this.game.width * 0.05;
                let width = this.game.width - padding;
                let height = this.game.height - padding;
                let lineWidth = width / 8;
                let offsetX = lineWidth / 2 + padding / 2;
                let offsetY = lineWidth / 2 + padding / 2;
                let squareWidth = width / 8 * 0.76;

                let maxY = Math.floor(height / lineWidth);
                let heightMax = maxY * lineWidth;
                let diff = height - heightMax;

                for(let y = 0; y < maxY; y ++) {
                    for(let x = 0; x < 8; x++) {
                        let square = new Prefab.BGSquare(this.game, squareWidth, x, y);
                        square.x = offsetX + (lineWidth * x);
                        square.y = offsetY + (diff * 0.50) + (lineWidth * y);
                        for(let i of Utils.SquarePositions.menuHide) {
                            if(i.x === x && i.y === y) {
                                square.typeChange(i.type);
                            }
                        }
                        if(x === 3 && y === 0) {
                            square.drawCircle();
                        }
                        sContainer.addChild(square);
                    }
                }

                let progressBackground = Game.Shapes.Rect(this.game.width, this.game.height * 0.15);
                progressBackground.y = sContainer.children[65].y + squareWidth;
                progressBackground.tint = Utils.Colours.DARK;
                this.addChild(progressBackground);

                let progressBar = Game.Shapes.Rect(this.game.width, this.game.height * 0.12);
                progressBar.y = (progressBackground.height - progressBar.height) * 0.5;
                progressBar.tint = Game.Utils.Colours.MEDIUM;
                progressBackground.addChild(progressBar);

                let progressBarTopShaddow = Game.Shapes.Rect(this.game.width, progressBar.height * 0.06);
                progressBarTopShaddow.tint = 0x000000;
                progressBarTopShaddow.alpha = 0.1;
                progressBar.addChild(progressBarTopShaddow);

                let progressBarBottomShaddow = Game.Shapes.Rect(this.game.width, progressBar.height * 0.04);
                progressBarBottomShaddow.tint = 0x000000;
                progressBarBottomShaddow.alpha = 0.1;
                progressBarBottomShaddow.y = progressBar.height - progressBarBottomShaddow.height;
                progressBar.addChild(progressBarBottomShaddow);

                progressBar.scale.x = 0;

                let loadingTween = this.game.tweens.create('preload', [
                    {
                        prop: "x",
                        from: 0,
                        to: 1,
                        time: 4000,
                        easing: this.game.tweens.easing.easeInOutExpo
                    }
                ]);

                loadingTween.events.onComplete.add (() => {
                    this.game.signals.dispatch('preloadComplete');
                })

                this.game.tweens.start(progressBar.scale, 'preload', false, 0, true);


                // setup the loader
                let loader = new PIXI.loaders.Loader();
                loader.on('error', this.error, this);
                loader.on('load', this.load, this);
                loader.once('complete', this.complete, this);
                
                // add all your assets here
                loader.add('assets/pokemon.png');

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
                // file = file.replace(/^.*[\\\/]/, '');

                let progress:number = resource.progressChunk;
            }

            /**
             * Called when the loader has finished loading everything
             */
            complete() {
                // new Game.States.MenuState(this.game);
            }
        }
    }
}