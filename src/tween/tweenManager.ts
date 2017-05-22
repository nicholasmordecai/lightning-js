/// <reference path="./../reference.d.ts" />

namespace Lightning {

    export class TweenManeger extends Plugin {

        protected game:Engine;

        private _active:boolean;

        private _tweens:Array<Tween>;
        private _toBeDestroyed:Array<Tween>;

        constructor(game:Engine) {
            super(game, true, true);
            this.game = game;
            this._active = true;

            this._tweens = [];
            this._toBeDestroyed = [];
        }

        protected update(dt:number) {
            if(!this._active) return;
        
            /**
             * Deal with tweens that should be destroyed
             */

            let t:number = this._tweens.length;
            while (t--) {
                if(this._tweens[t].toBeDestroyed) {
                    let tween = this._tweens[t];

                    // get index of tween in the tweens array and remove
                    let index:number = this._tweens.indexOf(tween);
                    this._tweens.splice(index, 1);

                    // remove reference to the manager
                    tween.manager = null;
                }
            }

            for(var i = 0, len = this._tweens.length; i < len; i++) {
                let tween:Tween = this._tweens[i];
                if(tween.active) {
                    tween.update(dt);
                }
            }
        }

        public create(objRef:DisplayObject, autoDestroy:boolean = false, key:string = null) {
            let tween = new Tween(this, objRef, autoDestroy);
            if(key !== null) {
                this._tweens[key] = tween;
            } else {
                this._tweens.push(tween);
            }
            return tween;
        }

        public start(tween:string|Tween) {
            if(typeof(tween) === 'string') {
                this._tweens[tween].active = true;
            } else {
                tween.active = true;
            }
        }

        public destroy(tween:string|Tween) {
            if(typeof(tween) === 'string') {
                let t = this._tweens[tween];
                t.toBeDestroyed = true;
                return t;
            } else {
                tween.toBeDestroyed = true;
                return tween;
            }
        }

        /**
         * probably not going to work, needs to be refatored
         */
        public getTween(key:string) {
            return this._tweens[key];
        }

        public pause(key:string) {
            this._tweens[key].pause();
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