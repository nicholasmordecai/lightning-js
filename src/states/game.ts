/// <reference path="./../reference.d.ts" />

namespace Game {
    export namespace States {
        export class GameState extends Game.State {

            constructor(game:Game.Engine) {
                super(game);
            }

            init(params) {
                console.log(params)
            }

            create() {
            
            }
        }
    }
}