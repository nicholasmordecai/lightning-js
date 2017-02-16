/// <reference path="../../../src/reference.d.ts" />
declare namespace Lightning {
    class Sprite extends PIXI.Sprite {
        protected _body: Box2D.Dynamics.b2Body;
        /**
         * @param  {PIXI.Texture=null} texture
         */
        constructor(texture?: PIXI.Texture);
        /**
         * @param  {boolean} val
         */
        enableBody(val: boolean): void;
        /**
         * @param  {number} aX
         * @param  {number=aX} aY
         * @returns void
         */
        setAnchor(aX: number, aY?: number): void;
        /**
         * @param  {number} aX
         * @param  {number=aX} aY
         * @returns void
         */
        setScale(aX: number, aY?: number): void;
        /**
         * @returns Box2D
         */
        /**
         * @param  {Box2D.Dynamics.b2Body} body
         */
        body: Box2D.Dynamics.b2Body;
        /**
         * @param  {} ...displayObjects
         */
        add(...displayObjects: any[]): void;
    }
}
