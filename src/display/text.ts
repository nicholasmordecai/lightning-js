/// <reference path="./../reference.d.ts" />

namespace Lightning {
    export class Text extends PIXI.Text {
        public globalRef:string;
        
        public constructor(text:string, style:PIXI.ITextStyleStyle, canvas:HTMLCanvasElement = null) {
            super(text, style, canvas);
        }

        public update(time: number) {
            
        }
    }
}