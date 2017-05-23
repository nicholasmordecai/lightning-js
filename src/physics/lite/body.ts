/// <reference path="./../../reference.d.ts" />

/**
 * Physice Lite Body
 * 
 */

namespace Lightning {
    export class LitePhysicsBody {

        private _drag:number;
        private _bounds:iBoundBox;
        private _hasMultipleBounds:boolean;
        private _velocity:iVelocity;
        private _active:boolean;
        private _destroyFlag:boolean;

        private _graphics:Graphics;

        public angle:number;
        public x:number;
        public y:number;

        private _objectRef:any;

        constructor(obj:any, inheritAnchor:boolean = true) {
            this.active = true;
            this._objectRef = obj;
            this._destroyFlag = false;
            this.angle = obj.y;
            this.x = obj.x;
            this.y = obj.y;
            this._velocity = {x:0, y: 0};
            this.bounds = {x: 0, y: 0, width: obj.width, height: obj.height};
            this.drag = 0;

            if(inheritAnchor) {
                this.setAnchor(obj.anchor.x, obj.anchor.y);
            }
        }

        public updateObjectRefPosition() {
            this._objectRef.x = this.x;
            this._objectRef.y = this.y;
        }

        public setAnchor(x:number, y:number = x) {
            this._bounds.x -= this._bounds.width * x;
            this._bounds.y -= this._bounds.height * y;

            console.log(this._bounds.width, this._bounds.x)
        }

        public enableDebug() {
            this._graphics = new Graphics();
            this._graphics.beginFill(0xff0000, 0.6);
            this._graphics.drawRect(this._bounds.x, this._bounds.y, this._bounds.width, this._bounds.height);
            this._graphics.endFill();
            this._objectRef.add(this._graphics);
        }

        public get bounds():iBoundBox {
            return this._bounds;
        }

        public set bounds(val:iBoundBox) {
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
