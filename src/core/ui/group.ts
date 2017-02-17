/// <reference path="./../../reference.d.ts" />

namespace Lightning {
    export class Group extends PIXI.Container {

        constructor() {
            super();
        }
        
        /**
         * @param  {} ...displayObjects
         */
        add(...displayObjects) {
             for(let i = 0; i < displayObjects.length -1; i++) {
                this.addChild(displayObjects[i]);
             }
        }
    }
}