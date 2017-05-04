/// <reference path="./../reference.d.ts" />

namespace Lightning {
    export class Maths {

        /**
         * @description generate a random integer between two values
         * @param  {number} from
         * @param  {number} to
         */
        public static rngInt(from: number, to: number) {
            return Math.floor(Math.random() * (to - from) + from);
        }

        /**
         * @description generate a random number
         * 
         * @param  {boolean=false} negative
         */
        public static rng(negative: boolean = false) {
            if (negative) {
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
        public static rngFloat(from: number, to: number) {
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
        public static rndPos(): iPoint {
            return { x: 0, y: 0 };
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
        public static distanceBetween(obj1, obj2): any {

            let xs = obj1.x - obj2.x;

            let ys = obj1.y - obj2.y;

            return Math.sqrt(xs * xs + ys * ys);

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
        public static hextoRGB(hex: any, out: any): any {
            out = out || [];

            out[0] = ((hex >> 16) & 0xFF) / 255;
            out[1] = ((hex >> 8) & 0xFF) / 255;
            out[2] = (hex & 0xFF) / 255;

            return out;

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
        public static rgbToHex(r: number, g: number, b: number): any {
            return "0x" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        }

        /**
         * @description Find the closest value in an array of valyes
         * @param {Array<number>} array 
         * @param {number} x
         * 
         * @returns {Array<number>}
         */
        public static closestValue(array:Array<number>, x:number):number {
            let low:number;
            let high:number;
            for (var i = array.length; i--;) {
                if(array[i] <= x && (low === undefined || low < array[i])) {
                    low = array[i];
                }

                if(array[i] >= x && (high === undefined || high > array[i])) {
                    high = array[i];
                }
            };

            let diffLow:number = x - low;
            let diffHigh:number = high - x;

            console.log(low, high, diffLow, diffHigh);

            if(diffHigh > diffLow) {
                return low;
            } else {
                return high;
            }
        }
    }
}