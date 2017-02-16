/// <reference path="./../../reference.d.ts" />

namespace Lightning {
    export class SVG extends Sprite {

        constructor(url:string) {
            super();
            let texture = PIXI.Texture.fromImage(url);
        }

        enableBody(val:boolean) {
            if(val) {
                
            }
        }

        /**
         * @param  {number} aX
         * @param  {number} aY
         */
        setAnchor(aX:number, aY:number = aX):void {
            this.anchor = new PIXI.Point(aX, aY);
        }
    }
}