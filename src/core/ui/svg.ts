/// <reference path="./../../reference.d.ts" />

namespace Lightning.UI {
    export class SVG extends Sprite {

        constructor(url:string) {
            super();
            let texture = PIXI.Texture.fromImage(url);
        }

        enableBody(val:boolean) {
            if(val) {
                
            }
        }

        setAnchor(aX, aY = aX):void {
            this.anchor = new PIXI.Point(aX, aY);
        }

        set body(body) {
            this._body = body;
        }

        get body() {
            return this._body;
        }
    }
}