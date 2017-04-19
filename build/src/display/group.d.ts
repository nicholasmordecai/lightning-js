/// <reference path="../../../src/reference.d.ts" />
declare namespace Lightning {
    class Group extends PIXI.Container {
        _events: EventEmitter;
        constructor();
        /**
         * @param  {} ...displayObjects
         */
        add(...displayObjects: any[]): void;
    }
}
