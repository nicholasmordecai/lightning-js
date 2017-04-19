/// <reference path="../../../src/reference.d.ts" />
declare namespace Lightning {
    class Engine extends EngineHelper {
        /**
         * @description Engine constructor
         *
         * @param {number} width
         * @param {number} height
         * @param {string} canvasId
         */
        constructor(width: any, height: any, canvasId?: string);
        /**
         * @description Main entry for every update function. This is called by the ticker on every request frame update
         *
         * @param {number} time
         *
         * @returns {void}
         */
        update(time: any): void;
        /**
         * @description Start the ticker
         *
         * @returns {boolean}
         */
        start(): boolean;
        /**
         * @description Stop the ticker
         *
         * @returns {boolean}
         */
        stop(): boolean;
    }
}
