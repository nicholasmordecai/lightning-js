/// <reference path="./../reference.d.ts" />

namespace Game {
    export class State extends PIXI.Container {
        
        protected game: Engine;

        constructor(game:Engine, ...params) {
            super();
            this.game = game;
            this.game.initState(this);
            this.init(params)
        }

        init(params) {
            
        }

        start() {
            
        }

        update() {
            
        }

        create() {

        }
    }
}