/// <reference path="./../reference.d.ts" />

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
        private _fpsEnabled:boolean;
        private _fpsInterval:number;
        private _currentFPSTick:number;
        private _interval:number;
        private _frames:Array<any>;
        // private _anims:Array<iLiveAnimation|iStaticAnimation>;
        private _staticAnimations: iStaticAnimation[];
        private _liveAnimations: iLiveAnimation[];
        private _length:number;
        private _currentPosition:number;

        private _active:boolean;
        private _autoDestroy:boolean;
        private _started:boolean;
        private _paused:boolean;
        private _loops:number;
        private _toSkip:number;
        
        private _toBeDestroyed:boolean;

        constructor(manager:TweenManeger, obj:DisplayObject, autoDestroy:boolean = false) {
            super();
            this._manager = manager;
            this._objRef = obj
            this._chains = [];
            this._live = true;
            this._staticAnimations = [];
            this._liveAnimations = [];
            this._length = 0;
            this._currentPosition = 0;
            this._fps = 60;
            this._interval = 1000 / this._fps;

            this._active = false;
            this._started = false;
            this._paused = false;
            this._loops = 0;
            this._currentFPSTick = 0;

            this._fpsEnabled = false;
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

            if(this._fpsEnabled) {
                this._currentFPSTick++;

                if(this._currentFPSTick >= this._fpsInterval) {
                    this._currentFPSTick = 0;
                } else {
                    return;
                }
            }

            let isDelayed:boolean = false;

            // calc new position for each anim
            for(let anim of this._liveAnimations) {
                if(anim.cDelay < anim.delay) {
                    isDelayed = true;
                    anim.cDelay++;
                } else {
                    if(anim.cPos < anim.maxPos) {
                        let newFrameData = anim.easing(this._currentPosition * this._interval, anim.from, anim.to - anim.from, anim.time);
                        this._objRef[anim.property] = newFrameData;
                        anim.cPos++;
                    }
                }
            }

            for(let anim of this._staticAnimations) {
                if(anim.cDelay < anim.delay) {
                    isDelayed = true;
                    anim.cDelay++;
                } else {
                    if(anim.cPos < anim.maxPos) {
                        this._objRef[anim.property] = anim.frames[anim.cPos];
                        anim.cPos++;
                    }
                }
            }

            if(!isDelayed) {
                this._currentPosition++;            
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

            let anim:iLiveAnimation = {from, to, time, property, delay, cDelay: 0, easing, cPos: 0, maxPos: Math.round(time / this._interval)};
            this._liveAnimations.push(anim);
        }

        public importAnim( property:string, frames:Array<number|string>, delay:number = 0) {
            delay = Math.round((delay * (this._fps / 60)) / (1000 / 60));
            let anim:iStaticAnimation = {frames, property, cPos:0, maxPos:frames.length, delay, cDelay: 0};
            this._staticAnimations.push(anim);
        }

        public start() {
            this._currentPosition = 0;
            this._started = true;
            this._paused = false;
            this._active = true;
            for(let anim of this._liveAnimations) {
                if(anim.maxPos > this._length) {
                    this._length = anim.maxPos;
                }
                anim.cPos = 0;
            }

            for(let anim of this._staticAnimations) {
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

            for(let anim of this._liveAnimations) {
                anim.cPos = 0;
            }

            for(let anim of this._staticAnimations) {
                anim.cPos = 0;
            }

            this.emit('loop', this);
        }

        public destroy() {
            this._active = false;
            this._paused = null;
            this._liveAnimations = null;
            this._staticAnimations = null;
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

        public setFps(val:number) { 
            if(val === 60) {
                this._fpsEnabled = false;
            } else {
                this._fpsEnabled = true;
                this._currentFPSTick = 0;
                this._fpsInterval = Math.round(60 / val);
            }
        }

        public get liveAnimations(): iLiveAnimation[] {
            return this._liveAnimations;
        }

        public get staticAnimations(): iStaticAnimation[] {
            return this._staticAnimations;
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