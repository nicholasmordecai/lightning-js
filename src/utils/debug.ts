/// <reference path="./../reference.d.ts" />

namespace Lightning {
    export class Debug {

        private engine:Engine;

        constructor(engine:Engine) {
            this.engine = engine;
        }

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
        private displayCount(rootObject:PIXI.DisplayObject = this.engine.world):number {
            return ((d) => {
                var c = 0;
                var r = function(d:PIXI.DisplayObject) {
                    c++;
                    for(let i of d['children']) {
                        r(i);
                    }
                }
                r(d);
                return c;
            })(rootObject);
        }
    }
}