/// <reference path="./../../reference.d.ts" />

namespace Lightning.UI {
    export class Sprite extends PIXI.Sprite {
        
        protected _body;

        constructor(texture:PIXI.Texture = null) {
            super(texture);
        }

        enableBody(val:boolean) {
            if(val) {
                
            }
        }

        setAnchor(aX, aY = null):void {
            if(!aY) {
                this.anchor = new PIXI.Point(aX, aX);
            } else {
                this.anchor = new PIXI.Point(aX, aY);
            }
        }

        set body(body) {
            this._body = body;
        }

        get body() {
            return this._body;
        }
    }
}