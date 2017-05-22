/// <reference path="./../../reference.d.ts" />

/**
 * Physice Lite Body
 * 
 */

namespace Lightning {
    export class LitePhysicsBody {

        private _drag:number;
        private _bounds:iBoundBox|Array<iBoundBox>;
        private _hasMultipleBounds:boolean;
        private _velocity:iVelocity;
        private _active:boolean;

        constructor(bounds:iBoundBox|Array<iBoundBox>, active:boolean = true, drag:number = 0) {
            this.active = active;

            if(bounds instanceof Array) {
                this.hasMultipleBounds = true;
            } else {
                this.hasMultipleBounds = false;
            }
            this.bounds = bounds;
            
            this.drag = drag;
        }

        public get bounds():iBoundBox|Array<iBoundBox> {
            return this._bounds;
        }

        public set bounds(val:iBoundBox|Array<iBoundBox>) {
            this._bounds = val;
        }

        public get active():boolean {
            return this._active;
        }

        public set active(val:boolean) {
            this._active = val;
        }

        public get drag():number {
            return this._drag;
        }

        public set drag(val:number) {
            this._drag = val;
        }

        public get velocity():iVelocity {
            return this._velocity;
        }

        public set velocity(val:iVelocity) {
            this._velocity = val;
        }

        public get hasMultipleBounds():boolean {
            return this._hasMultipleBounds;
        }

        public set hasMultipleBounds(val:boolean) {
            this._hasMultipleBounds = val;
        }
    }
}