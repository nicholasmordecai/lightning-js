/// <reference path="./../reference.d.ts" />

namespace Lightning {

    export class TweenManeger {
        /**
         * TODO
         * 2. AutoDestroy
         */

        private game:Engine;
        private _events:EventEmitter;

        private _active:boolean;

        private _tweens:Array<Tween>;
        private _activeTweens:Array<Tween>;
        private _toBeDestroyed:Array<Tween>;

        constructor(game:Engine) {
            this.game = game;
            this._events = new Lightning.EventEmitter();
            this._active = true;
            this.game.ticker.add(this.update, this);

            this._tweens = [];
            this._activeTweens = [];
            this._toBeDestroyed = [];
        }

        private update() {
            if(!this._active) return;
        
            /**
             * Deal with tweens that should be destroyed
             */

            let t:number = this._toBeDestroyed.length;
            while (t--) {
                // pull tween out of to be destroyed array
                let tween:Tween = this._toBeDestroyed.splice(t, 1)[0];

                // get index of tween in the tweens array and remove
                let index:number = this.find(tween, this._tweens);
                this._tweens.splice(index, 1);

                // get index of tween in active tweens array and remove
                index = this.find(tween, this._activeTweens);
                this._activeTweens.splice(index, 1);

                // remove reference to the manager
                tween.manager = null;
            }

            /**
             * Update the active tweens
             */
            for(var i = 0, len = this._activeTweens.length; i <= len; i++) {
                let tween:Tween = this._activeTweens[i];
                if(tween) {
                    tween.update();
                }
            }
        }

        public create(key:string, obj:DisplayObject, autoDestroy:boolean = false) {
            let tween = new Tween(this, obj, autoDestroy);
            this._tweens[key] = tween;
            return tween;
        }

        public start(tween:string|Tween) {
            let tempTween:Tween = null;

            if(typeof(tween) === 'string') {
                tempTween = this._tweens[tween];
            } else {
                tempTween = tween;
            }

            this._activeTweens.push(tempTween);
        }

        public destroy(tween:string|Tween) {
            if(typeof(tween) === 'string') {
                let t = this._tweens[tween];
                this._toBeDestroyed.push(t);
                return t;
            } else {
                this._toBeDestroyed.push(tween);
                return tween;
            }
        }

        public removeActive(tween:Tween){
            let index:number = 0;
            for(let i of this._activeTweens) {
                if(i === tween) {
                    this._activeTweens.splice(index, 1);
                }
                index++;
            }
        }

        private find(tween:Tween, array:Array<Tween>) {
            let c:number = 0;
            for(let i of array) {
                if(i === tween) {
                    return c;
                }
                c++;
            }
            return null;
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