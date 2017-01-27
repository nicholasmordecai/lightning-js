/// <reference path="./reference.d.ts" />

namespace app {
    export class app {

        public game:Lightning.Engine;

        constructor() {
            this.game = new Lightning.Engine(window.innerWidth, window.innerHeight);
            this.game.startPhysics();
            this.game.startState(Lightning.States.PreloadState);
        }
    }
}


new app.app();