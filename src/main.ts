/// <reference path="./reference.d.ts" />

namespace app {
    export class app {

        public game:Game.Engine;

        constructor() {
            this.game = new Game.Engine(window.innerWidth, window.innerHeight);
            new Game.States.BootState(this.game);
        }
    }
}


new app.app();