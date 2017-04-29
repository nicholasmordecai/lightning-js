/// <reference path="./../reference.d.ts" />

namespace Lightning {
    export class Graphics extends PIXI.Graphics {

        constructor() {
            super();
        }
        
        /**
         * @param  {} ...displayObjects
         */
        add(...displayObjects) {
             for(let i = 0; i < displayObjects.length; i++) {
                this.addChild(displayObjects[i]);
             }
        }
    }
}