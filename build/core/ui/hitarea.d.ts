/// <reference path="../../../src/reference.d.ts" />
declare namespace Lightning.UI {
    class HitArea extends PIXI.Graphics {
        private game;
        private _debug;
        private _texture;
        /**
         *
         * @param game
         * @returns {HitArea}
         */
        constructor(game: Engine, width: number, height: number);
        setRect(width: any, height: any): void;
        setCircle(radius: any): void;
        /**
         * @description Pass a function to be added to the click events
         * @param fnct
         */
        onClick(fnct: Function): void;
        /**
         * @description Pass a function to be added to the mouse, pointer and touch down events
         * @param fnct
         */
        down(fnct: Function): void;
        /**
         * @description Pass a function to be added to the mouse, touch and pointer up events
         * @param fnct
         */
        up(fnct: Function): void;
        /**
         * @description Pass a function to be added to the mouse, pointer and touch up outside events
         * @param fnct
         */
        upOutside(fnct: Function): void;
        /**
         * @description Pass a function to be added to the mouse and pointer over events
         * @param fnct
         */
        over(fnct: Function): void;
        /**
         * @description Pass a function to be added to the mouse and pointer out events
         * @param fnct
         */
        out(fnct: Function): void;
        /**
         * @description Pass a function to be added to the mouse and pointer move event
         * @param fnct
         */
        move(fnct: Function): void;
        /**
         * @description Pass a function to be added to the right click events
         * @param fnct
         */
        rightClick(fnct: Function): void;
        /**
         * @description Pass a function to be added to the right down events
         * @param fnct
         */
        rightDown(fnct: Function): void;
        /**
         * @description Pass a function to be added to the right up events
         * @param fnct
         */
        rightUp(fnct: Function): void;
        /**
         * @description Pass a function to be added to the right up outside events
         * @param fnct
         */
        rightUpOutside(fnct: Function): void;
        /**
         * @description Pass a function to be added to the tap event
         *
         * @param fnct
         */
        onTap(fnct: Function): void;
        /**
         * @description Sets the debug enabled / disabled and the alpha to 0.5 accordingly
         *
         * @param {Array} data passed in from the signal dispatch event
         */
        debug(data: any): void;
    }
}
