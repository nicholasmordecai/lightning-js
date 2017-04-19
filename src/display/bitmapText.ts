/// <reference path="./../reference.d.ts" />

namespace Lightning {
    export class BitmapText extends PIXI.extras.BitmapText {

        // constructor() {
        //     super();
        // }

        /**
         * @description function for calculating scaling fonts
         * 
         * @param {Object} game reference to the Engine instance
         * @param {number} size size of the font (in responsive pixels)
         * @param {string} font name of the font stored in resource cache
         * 
         * @returns {string} concatinated string to pass directly to the PIXI.extras.BitmapText 
         */
        calcFont(game:Engine, size:number, font:string):string {
            let str =  ((game.width) / size).toString() + 'px ' + font; 
            return str;
        }
    }
}