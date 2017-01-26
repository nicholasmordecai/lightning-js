/// <reference path="./reference.d.ts" />

namespace app {
    export class app {

        public game:Lightening.Engine;

        constructor() {
            this.game = new Lightening.Engine(window.innerWidth, window.innerHeight);
            this.game.startState(Lightening.States.PreloadState);
        }
    }
}


new app.app();