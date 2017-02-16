/// <reference path="../../../src/reference.d.ts" />
declare namespace Lightning {
    class Sprite extends PIXI.Sprite {
        protected _body: any;
        constructor(texture?: PIXI.Texture);
        enableBody(val: boolean): void;
        setAnchor(aX: any, aY?: any): void;
        setScale(aX: any, aY?: any): void;
        body: any;
        /**
         * @param  {} ...displayObjects
         */
        add(...displayObjects: any[]): void;
    }
}
