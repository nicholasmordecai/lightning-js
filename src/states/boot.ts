/// <reference path="./../reference.d.ts" />

namespace Lightning {
    export namespace States {
        export class BootState extends State {

            constructor(game:Engine) {
                super(game);
            }

            init(params) {
                this.create();
            }

            create() {
                this.game.backgroundColor = Utils.Colours.BG;
                new States.PreloadState(this.game);
            }

            update() {
                console.log('update boot')
            }
        }
    }
}