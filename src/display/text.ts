/// <reference path="./../reference.d.ts" />

namespace Lightning {
    export class Text extends PIXI.Text {
        public globalRef:string;
        
        public constructor(text:string, style?:iTextStyle, canvas?:HTMLCanvasElement) {
            super(text, style, canvas);
        }

        /**
         * @param  {number} aX
         * @param  {number=aX} aY
         * @returns void
         */
        setAnchor(aX:number, aY:number = aX):void {
            this.anchor = new PIXI.Point(aX, aY);
        }

        public update(time: number) {
            
        }
    }
}