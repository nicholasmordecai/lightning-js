/// <reference path="./../reference.d.ts" />

namespace Lightning {

    export class TweenManeger extends EventEmitter {

        private game:Engine;

        private _active:boolean;

        private _tweens:Array<Tween>;
        private _activeTweens:Array<Tween>;

        constructor(game:Engine) {
            super();
            this.game = game;
            this._active = true;
            this.game.ticker.add(this.update, this);
        }

        private update() {
            if(!this._active) return;

            for(var i = 0, len = this._activeTweens.length; i < len; i++) {
                let tween = this._activeTweens[i];
                tween.update();
            }
        }

        public stopUpdate() {
            this.game.ticker.remove(this.update, this);
        }

        public startUpdate() {
            this.game.ticker.add(this.update, this);
        }

        public pauseUpdate() {
            this._active = false;
        }
    }
}