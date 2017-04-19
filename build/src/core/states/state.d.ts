/// <reference path="../../../../src/reference.d.ts" />
declare namespace Lightning {
    class State extends PIXI.Container {
        game: Engine;
        loader: PIXI.loaders.Loader;
        events: EventEmitter;
        /**
         * @description State constructor
         *
         * @param {Engine} game
         */
        constructor(game: Engine);
        /**
         * @description Initalization function
         *
         * @param {Array} params
         *
         * @returns {void}
         */
        init(params: any): void;
        /**
         * @description Preload function. Used as a helper function to preload assets into the texture cache. Will skip and call the create function if there are no resources to load
         *
         * @returns {void}
         */
        preload(): void;
        /**
         * @description Create function. Called after the preload function is complete or there is nothing to preload
         *
         * @returns {void}
         */
        create(): void;
        /**
         * @description Update function. This is called by the state manager on every tick
         */
        update(time?: number): void;
        /**
         * @description Add children to this state. Helper functions should be migrated at some point
         *
         * @returns {boolean}
         */
        add(...params: Array<DisplayObject>): boolean;
        /**
         * @description Called if the loader produces an error
         *
         * @returns {void}
         */
        preloadError(err: any): void;
        /**
         * @description Called when a single file has completed loading
         *
         * @returns {void}
         */
        preloadSingle(loader: PIXI.loaders.Loader, resource: any): void;
        /**
         * @description Called when the loader has finished loading everything
         *
         * @returns {void}
         */
        preloadComplete(loader: any, resources: any): void;
    }
}
