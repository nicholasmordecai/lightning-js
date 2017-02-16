/// <reference path="../../../src/reference.d.ts" />
declare namespace Lightning {
    class Button extends Sprite {
        protected game: Engine;
        protected _primitive: string;
        protected _hitArea: HitArea;
        /**
         * @param  {Engine} game
         * @param  {} texture=null
         */
        constructor(game: Engine, texture?: any);
        /**
         */
        initalise(): void;
        /**
         * @param  {number} aX
         * @param  {number=null} aY
         * @returns void
         */
        setAnchor(aX: number, aY?: number): void;
        /**
         * @returns HitArea
         */
        readonly hit: HitArea;
    }
}
