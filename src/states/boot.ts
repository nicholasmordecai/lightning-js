/// <reference path="./../reference.d.ts" />

namespace Game {
    export namespace States {
        export class BootState extends Game.State {

            constructor(game:Game.Engine) {
                super(game);
            }

            init(params) {
                this.create();
            }

            create() {
                this.game.renderer.backgroundColor = Game.Utils.Colours.BG;
                new Game.States.PreloadState(this.game);
            }

            update() {
            console.log('update boot')
            }
        }
    }
}