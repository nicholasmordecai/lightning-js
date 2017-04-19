/// <reference path="./../reference.d.ts" />

/**
 * Order the world when created
 */

namespace Lightning {
    export class HUD extends Group {

        protected game:Engine;

        constructor(game:Engine) {
            super();
            this.game = game;
        }
    }
}