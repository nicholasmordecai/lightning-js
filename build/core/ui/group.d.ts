/// <reference path="../../../src/reference.d.ts" />
declare namespace Lightning {
    class Group extends PIXI.Container {
        constructor(game: Engine, texture?: any);
        /**
         * @param  {} ...displayObjects
         */
        add(...displayObjects: any[]): void;
    }
}
