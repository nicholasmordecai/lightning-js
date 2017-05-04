/// <reference path="./../reference.d.ts" />

declare interface IAnim {
    from:number;
    to:number;
    time:number;
    property:string;
    delay:number;
    easing:Function;
    cPos:number;
    maxPos:number;
}

declare interface IFrame {
    data:any;
}

declare interface IImportedAnim {
    frames:Array<number>;
    property:string;
    cPos:number;
    maxPos:number;
}

namespace Lightning {
    /**
     * TODO
     * 1. Wait
     * 2. Chain
     * 
     */

    /**
     * Bugs
     * 
     */

    export class Tween extends EventEmitter {

        private _manager:TweenManeger;
        private _objRef:Lightning.DisplayObject;
        private _chains:Array<Tween>;
        private _live:boolean;
        private _frames:Array<any>;
        private _anims:Array<IAnim>;
        private _length:number;
        private _currentPosition:number;

        private _active:boolean;
        private _autoDestroy:boolean;
        private _started:boolean;
        private _paused:boolean;
        private _loops:number;
        private _toBeDestroyed:boolean;

        constructor(manager:TweenManeger, obj:DisplayObject, autoDestroy:boolean = false) {
            super();
            this._manager = manager;
            this._objRef = obj
            this._chains = [];
            this._live = true;
            this._anims = [];
            this._length = 0;
            this._currentPosition = 0;

            this._active = false;
            this._started = false;
            this._paused = false;
            this._loops = 0;
            this._toBeDestroyed = false;
            this._autoDestroy = autoDestroy;

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

            this._currentPosition++;

            if(this._live) {

                // calc new position for each anim
                for(let anim of this._anims) {
                    if(anim.cPos < anim.maxPos) {
                        let newFrameData = anim.easing(this._currentPosition * 16.67, anim.from, anim.to - anim.from, anim.time);
                        this._objRef[anim.property] = newFrameData;
                        anim.cPos++;
                    }
                }

                if(this._currentPosition >= this._length) {
                    if(this._loops > 1) {
                        this.loop();
                    } else {
                        this.complete();
                    }
                }

            } else {
                let pos = this._frames[this._currentPosition];
                    if(this._currentPosition >= this._frames.length-1) {
                    if(this._loops > 1) {
                        this.loop();
                    } else {
                        this.complete();
                    }
                }
            }

            this.emit('tick', this);
        }

        public createAnim(from:number, to:number, time:number, delay:number, property:string, easing:Function) {
            let anim:IAnim = {from, to, time, property, delay, easing, cPos: 0, maxPos: Math.round(time / 16.67)};
            this._anims.push(anim);
        }

        public importAnim(frames:Array<number>, property:string) {
            let anim:IImportedAnim = {frames, property, cPos:0, maxPos:frames.length};
            this._live = false;
        }

        public start() {
            this._currentPosition = 0;
            this._started = true;
            this._paused = false;
            this._active = true;
            for(let anim of this._anims) {
                if(anim.maxPos > this._length) {
                    this._length = anim.maxPos;
                }
                anim.cPos = 0;
            }

            this._manager.start(this);
            this.emit('start', this);
        }

        private complete() {
            this._active = false;
            this._started = false;
            this.emit('complete', this);

            for(let i of this._chains) {
                i.start();
            }

            if(this._autoDestroy) {
                this.destroy();
            }

            this._manager.removeActive(this);
        }

        public pause(val:boolean) {
            this._paused = val;
            this.emit('pause');
        }

        private loop() {
            this._loops--;
            this._currentPosition = 0;
            for(let anim of this._anims) {
                anim.cPos = 0;
            }
            this.emit('loop', this);
        }

        public destroy() {
            this._active = false;
            this._paused = null;
            this._anims = null;
            this._chains = null;
            this._currentPosition = null;
            this._frames = null;
            this._length = 0;
            this._loops = null;
            this._objRef = null;
            this._started = null;
            this._manager.destroy(this);
            this.emit('destroy', this);
        }

        public reset() {
            this._active = false;
            this._paused = false;
            this._currentPosition = 0;
            this._started = false;
            this.emit('reset', this);
        }

        public moveTo(frame:number):number {

            if(this._live) {
                if(frame >= this._length) {
                    this._currentPosition = 0;
                    return 0;
                } else {
                    this._currentPosition = frame;
                    return frame;
                }
            } else {
                if(frame >= this._frames.length-1) {
                    this._currentPosition = 0;
                    return 0;
                } else {
                    this._currentPosition = frame;
                    return frame;
                }
            }
        }

        public chain(...tweens:Array<Tween>) {
            for(let i of tweens) {
                this._chains.push(i);
            }
        }

        public set loops(val:number) {
            this._loops = val;
        }

        public get loops():number {
            return this._loops;
        }

        public set autoDestroy(val:boolean) {
            this._autoDestroy = val;
        }

        public get autoDestroy():boolean {
            return this._autoDestroy;
        }

        public get started():boolean {
            return this._started;
        }

        public get manager():TweenManeger {
            return this._manager;
        }

        public set manager(val:TweenManeger) {
            this._manager = val;
        }
    }
}