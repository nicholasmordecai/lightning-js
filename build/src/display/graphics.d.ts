/// <reference path="../../../src/reference.d.ts" />
declare namespace Lightning {
    class Graphics extends PIXI.Graphics {
        constructor();
        /**
         * @param  {} ...displayObjects
         */
        add(...displayObjects: any[]): void;
    }
}
