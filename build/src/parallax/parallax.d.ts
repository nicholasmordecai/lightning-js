/// <reference path="../../../src/reference.d.ts" />
interface iTile {
    key: string;
    object: PIXI.extras.TilingSprite;
    updateX: number;
    updateY: number;
    updateRelative: number;
    index: number;
}
declare namespace Lightning {
    class Parallax extends Group {
        protected game: Engine;
        protected _tiles: Array<iTile>;
        protected _width: number;
        protected _height: number;
        protected _scrollSpeed: number;
        protected _incMultiplier: number;
        protected _watch: any;
        protected _watchX: boolean;
        protected _watchY: boolean;
        protected _watchOffset: {
            x: number;
            y: number;
        };
        protected _lastWatch: {
            x: number;
            y: number;
        };
        protected _watchIncMultiplier: {
            x: number;
            y: number;
        };
        protected _watchDampner: {
            x: number;
            y: number;
        };
        protected _referenceOffset: {
            x: number;
            y: number;
        };
        /**
         * @param  {Engine} game
         * @param  {number=null} width
         * @param  {number=null} height
         */
        constructor(game: Engine, width?: number, height?: number);
        /**
         * @param  {string} key
         * @param  {Texture} texture
         * @param  {boolean=false} xy
         */
        add(key: string, texture: Texture, xy?: boolean): void;
        /**
         *
         */
        update(): void;
        /**
         * @param  {string} key
         */
        getTile(key: string): iTile;
        /**
         * @param  {any} val
         * @returns void
         */
        setWatch(val: any, x?: boolean, y?: boolean): void;
        /**
         * @param  {number} x
         * @param  {number=x} y
         * @returns void
         */
        setWatchOffset(x: number, y?: number): void;
        /**
         * @param  {boolean=false} x
         * @param  {boolean=false} y
         */
        setWatchXY(x?: boolean, y?: boolean): void;
        /**
         * @param  {number} x
         * @param  {number=x} y
         * @returns void
         */
        setReferenceOffset(x: number, y?: number): void;
        setWatchDampner(x: number, y?: number): void;
        /**
         * @param  {string} key
         * @param  {number=0} x
         * @param  {number=0} y
         * @returns void
         */
        setUpdate(key: string, x?: number, y?: number): void;
        /**
         * @param  {number} val
         * @returns void
         */
        setScrollSpeed(val: number): void;
        /**
         * @param  {number} val
         * @param  {boolean=false} reset
         * @param  {boolean=false} xy
         * @returns void
         */
        setIncrementMultiplier(val: number, reset?: boolean, xy?: boolean): void;
        /**
         * @param  {number} x
         * @param  {number=x} y
         * @returns void
         */
        setWatchIncerementMultiplier(x: number, y?: number): void;
        /**
         * @returns number
         */
        readonly scrollSpeed: number;
    }
}
