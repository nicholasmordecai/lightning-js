/// <reference path="./../../reference.d.ts" />

namespace Lightning {

    export class Timer {

        private game:Engine;
        private _events:EventEmitter;
        private _currentTime:number;
        private _lastTick:number;
        private _autoDestroy:boolean;
        private _isLoop:boolean;
        private _interval:number;
        private _active:boolean;

        constructor(game:Engine, interval:number = 1000, autoStart:boolean = true, loop:boolean = true, autoDestroy:boolean = false) {
            this.game = game;

            // set initial properties
            this._interval = interval;
            this._isLoop = loop;
            this._autoDestroy = autoDestroy;
            this._lastTick = 0;
            this._currentTime = 0;
            this._active = false;

            // create events
            this._events = new EventEmitter();
            this._events.create('tick');
            this._events.create('start');
            this._events.create('stop');
            this._events.create('reset');
            this._events.create('destroy');
            if(autoStart) {
                this._active = true;
            }

            // put this update as a callback inside the engine ticker
            this.game.ticker.add(this.update, this);
        }

        public update(time) {
            if(this._active) {
                this._currentTime += this.game.ticker.elapsedMS;
                if(this._currentTime >= this._lastTick + this._interval) {
                    this._lastTick = this._currentTime;
                    this._events.emit('tick', time);
                    if(this._isLoop === false) {
                        this.stop();
                    }
                }
            }
        }

        public start() {
            this._active = true;
        }

        public stop() {
            this._active = false;
        }

        public reset() {
            this._currentTime = 0;
            this._lastTick = 0;
        }

        public destroy() {
            this._active = null;
            this._autoDestroy = null;
            this.game.ticker.remove(this.update, this);
            this._currentTime = null;
            this._events.destroy();
            this._interval = null;
            this._isLoop = null;
            this._lastTick = null;
        }

        public get events():EventEmitter {
            return this._events;
        }

        public get interval():number {
            return this._interval;
        }

        public set interval(val:number) {
            this._interval = val;
        }

        public get autoDestroy():boolean {
            return this._autoDestroy
        }

        public set autoDestroy(val:boolean) {
            this._autoDestroy = val;
        }

        public get loop():boolean {
            return this._isLoop;
        }

        public set loop(val:boolean) {
            this._isLoop = val;
        }

        public get active():boolean {
            return this._active;
        }

        public set active(val:boolean) {
            this._active = val;
        }
    }
}