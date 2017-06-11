/// <reference path="./../../reference.d.ts" />

namespace Lightning {

    export class Key extends EventEmitter{
        private _asciiCode:number;
        private _alias:string;
        private _isDown:boolean;
        private _isUp:boolean;
        private _event:Event;

        constructor(asciiCode:number, alias:string) {
            super();

            // create events
            this.create('pressed');
            this.create('released');

            this._asciiCode = asciiCode;
            this._alias = alias;
            this._isDown = false;
            this._isUp = true;
        }

        public press() {
            if(this._isDown) return;
            this.emit('pressed');
            this._isDown = true;
            this._isUp = false;
        }

        public release() {
            if(this._isUp) return;
            this.emit('released');
            this._isDown = false;
            this._isUp = true;
        }

        public get isDown():boolean {
            return this._isDown;
        }

        public get isUp():boolean {
            return this._isUp;
        }

        public get ascii() {
            return this._asciiCode;
        }

        public get alias() {
            return this._alias;
        }
    }
}