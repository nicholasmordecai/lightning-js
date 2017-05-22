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
        private _destroyFlag:boolean;

        public x:number;
        public y:number;
        public angle:number;

        private _objectRef:DisplayObject;

        constructor(obj:any, bounds:iBoundBox|Array<iBoundBox>, active:boolean = true, drag:number = 0) {
            this.active = active;
            this._destroyFlag = false;
            this.x = obj.x;
            this.y = obj.y;
            this.angle = obj.y;

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

        public get destroyFlag():boolean {
            return this._destroyFlag;
        }

        public set destroyFlag(val:boolean) {
            this.destroyFlag = val;
        }

        public get objRef():DisplayObject {
            return this._objectRef;
        }

        public set objRef(val:DisplayObject) {
            this._objectRef = val;
        }
    }
}
