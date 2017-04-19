/// <reference path="../../../src/reference.d.ts" />
declare namespace Lightning {
    class Sprite extends PIXI.Sprite {
        private _events;
        protected _body: Box2D.Dynamics.b2Body;
        protected _respectPosition: boolean;
        protected _respectPositionValues: {
            x: number;
            y: number;
        };
        protected _input: Input;
        /**
         * @param  {PIXI.Texture=null} texture
         */
        constructor(texture?: PIXI.Texture);
        enableInput(): void;
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
        enableDrag(respectPosition?: boolean): void;
        startDrag(event: PIXI.interaction.InteractionEvent): void;
        stopDrag(event: PIXI.interaction.InteractionEvent): void;
        onDrag(event: PIXI.interaction.InteractionEvent): void;
        readonly input: Input;
    }
}
