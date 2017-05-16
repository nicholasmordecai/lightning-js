/// <reference path="./../reference.d.ts" />

declare interface ILiveAnim {
    from:number;
    to:number;
    time:number;
    property:string;
    delay:number;
    cDelay:number;
    easing:Function;
    cPos:number;
    maxPos:number;
    live:boolean;
}

declare interface IFramedAnim {
    frames:Array<number|string>;
    property:string;
    cPos:number;
    maxPos:number;
    delay:number;
    cDelay:number;
    live:boolean;
}

namespace Lightning {

    /**
     * TODO
     * 1. FPS
     */

    export class Tween extends EventEmitter {

        private _manager:TweenManeger;
        private _objRef:Lightning.DisplayObject;
        private _chains:Array<Tween>;
        private _live:boolean;
        private _fps:number;
        private _interval:number;
        private _frames:Array<any>;
        private _anims:Array<ILiveAnim|IFramedAnim>;
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
            this._fps = 60;
            this._interval = 1000 / this._fps;

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

        public update(dt:number) {
            if(this._paused) return;

            this._currentPosition++;

            // calc new position for each anim
            for(let anim of this._anims) {

                if(anim.live) {
                    anim = anim as ILiveAnim
                    if(anim.cDelay < anim.delay) {
                        anim.cDelay++;
                    } else {
                        if(anim.cPos < anim.maxPos) {
                            let newFrameData = anim.easing(this._currentPosition * this._interval, anim.from, anim.to - anim.from, anim.time);
                            this._objRef[anim.property] = newFrameData;
                            anim.cPos++;
                        }
                    }
                } else {
                    anim = anim as IFramedAnim
                    if(anim.cDelay < anim.delay) {
                        anim.cDelay++;
                    } else {
                        if(anim.cPos < anim.maxPos) {
                            this._objRef[anim.property] = anim.frames[anim.cPos];
                            anim.cPos++;
                        }
                    }
                }
            }

            if(this._currentPosition >= this._length) {
                if(this._loops > 1 || this._loops === -1) {
                    this.loop();
                } else {
                    this.complete();
                }
            }

            this.emit('tick', this);
        }

        public createAnim(from:number, to:number, time:number, property:string, easing:Function, delay:number = 0) {
            delay = Math.round((delay * (this._fps / 60)) / (1000 / 60));
            let anim:ILiveAnim = {from, to, time, property, delay, cDelay: 0, easing, cPos: 0, maxPos: Math.round(time / this._interval) + delay, live:true};
            this._anims.push(anim);
        }

        public importAnim( property:string, frames:Array<number|string>, delay:number = 0) {
            delay = Math.round((delay * (this._fps / 60)) / (1000 / 60));
            let anim:IFramedAnim = {frames, property, cPos:0, maxPos:frames.length, delay, cDelay: 0, live:false};
            this._anims.push(anim);
        }

        public exportAnim(key:string) {
            let anim = this._anims[key];
            if(anim) {
                return anim.frames;
            }
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
            
            for(let i of this._chains) {
                i.start();
            }

            this.emit('complete', this);
        }

        public pause(val:boolean) {
            this._paused = val;
            this.emit('pause');
        }

        private loop() {
            if(this._loops !== -1) {
                this._loops--;
            }
            
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

        public set active(val:boolean) {
            this._active = val;
        }

        public get active():boolean {
            return this._active;
        }

        public set loops(val:number) {
            this._loops = val;
        }

        public get loops():number {
            return this._loops;
        }

        public get fps():number {
            return this._fps;
        }

        // public set fps(val:number) {
        //     this._fps = val;
        //     this._interval = 1000 / this._fps;
        // }

        public get interval():number {
            return this._interval;
        }

        public get length():number {
            return this._length;
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

        public get toBeDestroyed():boolean {
            return this._toBeDestroyed;
        }

        public set toBeDestroyed(val:boolean) {
            this._toBeDestroyed = val;
        }
    }
}