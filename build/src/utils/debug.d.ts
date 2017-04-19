/// <reference path="../../../src/reference.d.ts" />
declare namespace Lightning {
    class Debug {
        private engine;
        constructor(engine: Engine);
        /**
         * @description recursive pattern to loop over every child and recursivly loop over all of it's children and returning a count of them all from the root object.
         * You can use a specific root display object, or you can leave blank and it will default to the world stage.
         *
         * Example:
         * this.game.debug.displayCount();
         * this.game.debug.displayCount(myContainer);
         *
         * @see {Lightning.Engine}
         *
         * @param rootObject
         * @returns {number}
         */
        private displayCount(rootObject?);
    }
}
