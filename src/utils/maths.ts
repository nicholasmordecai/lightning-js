/// <reference path="./../reference.d.ts" />

namespace Lightning {
    export class Maths {

        /**
         * @description generate a random integer between two values
         * @param  {number} from
         * @param  {number} to
         */
        public static rngInt(from:number, to:number) {
            return Math.floor(Math.random() * (to - from) + from);  
        }
        
        /**
         * @description generate a random number
         * 
         * @param  {boolean=false} negative
         */
        public static rng(negative:boolean = false) {
            if(negative) {
                return Math.random();
            } else {
                return -Math.random();
            }
        }
        
        /**
         * @description generate a random float between two values
         * 
         * @param {number} from
         * @param {number} to
         */
        public static rngFloat(from:number, to:number) {
            return Math.random() * (to - from) + from;  
        }

        /**
         * TODO
         * Generate random position in a given area
         * 
         * @param {iPoint} from
         * @param {iPoint} to
         * 
         * @returns {iPoint}
         */
        public static rndPos():iPoint {
            return {x:0, y: 0};
        }

        /**
         * TODO
         * @description Calculate distance between two positions
         * 
         * @param {iPoint} pos1
         * @param {iPoint} pos2
         * 
         * @returns {iPoint}
         */
         public static distanceBetween():iPoint {
            return {x:0, y:0};
         }

         /**
         * TODO
         * @description Convert Hex to RGB
         * 
         * @param {iPoint} pos1
         * @param {iPoint} pos2
         * 
         * @returns {iPoint}
         */
         public static hextoRGB():iPoint {
            return {x:0, y:0};
         }

         /**
         * TODO
         * @description Calculate RGB to Hex
         * 
         * @param {iPoint} pos1
         * @param {iPoint} pos2
         * 
         * @returns {iPoint}
         */
         public static rgbToHex():iPoint {
            return {x:0, y:0};
         }
    }
}