/// <reference path="./../reference.d.ts" />

namespace Lightning {

    export class Tween extends EventEmitter {

        private _live:boolean;
        private _frames:Array<any>;
        private _currentPosition:number;

        private _active:boolean;
        private _autoDestroy:boolean;
        private _started:boolean;
        private _paused:boolean;
        private _loops:number;
        private _toBeDestroyed:boolean;

        constructor() {
            super();

            this._live = false;
            this._frames = [];
            this._currentPosition = 0;

            this._active = false;
            this._started = false;
            this._paused = false;
            this._loops = 0;
            this._toBeDestroyed = false;
            this._autoDestroy = false;

            this.create('start');
            this.create('pause');
            this.create('tick');
            this.create('loop');
            this.create('complete');
            this.create('reset');
            this.create('destroy');
        }

        public update() {
            if(!this._active || this._paused) return;

            if(this._live) {
                // calculate next positions
            } else {
                let pos = this._frames[this._currentPosition];
            }

            this.emit('tick');

            if(this._currentPosition >= this._frames.length-1) {
                if(this._loops > 0) {
                    this.loop();
                } else {
                    this.complete();
                }
            }
        }

        private complete() {
            this._active = false;
            this.emit('complete', [this]);
            if(this._autoDestroy) {
                this.destroy();
            }
        }

        private loop() {
            this._loops--;
            this._currentPosition = 0;
            this.emit('loop', [this._loops]);
        }

        public destroy() {

        }

        public reset() {
            this._active = false;
            this._paused = false;
            this._currentPosition = 0;
        }

        public moveTo(frame:number):number {
            if(frame >= this._frames.length-1) {
                this._currentPosition = 0;
                return 0;
            } else {
                this._currentPosition = frame;
                return frame;
            }
        }
    }
}