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
        private _velocity:iVector;
        private _mass:number;
        private _static:boolean;
        private _active:boolean;
        private _destroyFlag:boolean;

        private _graphics:Graphics;
        private _deltaG:iVector;
        private _pauseCollisionDetection:boolean;
        private _collideOnWorldBounds:boolean;
        private _gravityEnabled:boolean;
        private _restitution:number;

        public angle:number;
        public x:number;
        public y:number;

        private _objectRef:any;

        constructor(obj:any, inheritAnchor:boolean = true) {
            this.active = true;
            this._objectRef = obj;
            this._destroyFlag = false;
            // this.angle = obj.angle;
            this.x = obj.x;
            this.y = obj.y;
            this._pauseCollisionDetection = false;
            this._velocity = {x:0, y: 0};
            this._deltaG = {x: 0, y: 0};
            this._mass = 1;
            this._static = false;
            this.bounds = {x: 0, y: 0, width: obj.width, height: obj.height};
            this._collideOnWorldBounds = false;
            this.drag = 0;
            this._restitution = 1;

            if(inheritAnchor) {
                this.setAnchor(obj.anchor.x, obj.anchor.y);
            }
        }

        public accelerateTo() {
            
        }

        public updateObjectRefPosition() {
            this._objectRef.x = this.x;
            this._objectRef.y = this.y;
        }

        public setAnchor(x:number, y:number = x) {
            this._bounds.x -= this._bounds.width * x;
            this._bounds.y -= this._bounds.height * y;
        }

        public enableDebug() {
            this._graphics = new Graphics();
            this._graphics.beginFill(0xff0000, 0.2);
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

        public get restitution():number {
            return this._restitution;
        }

        public set restitution(val:number) {
            this._restitution = val;
        }

        public get mass():number {
            return this._mass;
        }

        public set mass(val:number) {
            this._mass = val;
        }

        public get velocity():iVector {
            return this._velocity;
        }

        public set velocity(val:iVector) {
            this._velocity = val;
        }

        public get static():boolean {
            return this._static;
        }

        public set static(val:boolean) {
            this._static = val;
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
            this._destroyFlag = val;
        }

        public get collideOnWorldBounds():boolean {
            return this._collideOnWorldBounds;
        }

        public set collideOnWorldBounds(val:boolean) {
            this._collideOnWorldBounds = val;
        }

        public get gravityEnabled():boolean {
            return this._gravityEnabled;
        }

        public set gravityEnabled(val:boolean) {
            this._gravityEnabled = val;
        }

        public get objRef():DisplayObject {
            return this._objectRef;
        }

        public set objRef(val:DisplayObject) {
            this._objectRef = val;
        }

        public get pauseCollisionDetection():boolean {
            return this._pauseCollisionDetection;
        }

        public set pauseCollisionDetection(val:boolean) {
            this._pauseCollisionDetection = val;
        }

        public get deltaG():iVector {
            return this._deltaG;
        }

        public set deltaG(val:iVector) {
            this._deltaG = val;
        }
    }
}
