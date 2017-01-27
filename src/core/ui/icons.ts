/// <reference path="./../../reference.d.ts" />

namespace Lightning.UI {
    export namespace Icons {
        /**
         * @description Draw a hamburger menu icon
         * 
         * @param {number} s size of the icon in pixels
         * 
         * @returns {PIXI.Graphics}
         */
        export function Hamburger(s:number):PIXI.Graphics {
            let graphics = new PIXI.Graphics();
            graphics.beginFill(0xffffff, 1);
            graphics.drawRect(0, 0, s, s * 0.15);
            graphics.drawRect(0, s * 0.4, s, s * 0.15);
            graphics.drawRect(0, s * 0.8, s, s * 0.15);
            graphics.endFill();
            return graphics;
        }
    }
}