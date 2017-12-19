/// <reference path="./../reference.d.ts" />

/**
 * TODO
 * Unique Between
 * Min / Max of numbers in an array
 */

namespace Lightning {
    export class Maths {

        /**
         * @description generate a random integer between two values
         * 
         * @param  {number} from
         * @param  {number} to
         * 
         * @returns {number}
         * 
         * @example 
         * ~~~
         * 
         * Lightning.Math.rngInt(0, 100) // returns random in range of 0 and 100
         * ~~~
         */
        public static rngInt(from: number, to: number):number {
            return Math.floor(Math.random() * (to - from) + from);
        }

        /**
         * @description generate a random number
         * 
         * @param  {boolean=false} negative
         * 
         * @example 
         * ~~~
         * 
         * Lightning.Math.rng(); // returns random in range of 0 and 1
         * Lightning.Math.rng(true); // returns a random in range of -0 and -1
         * ~~~
         */
        public static rng(negative: boolean = false):number {
            if (negative) {
                return Math.random();
            } else {
                return -Math.random();
            }
        }

        /**
         * @description generate a random float between two values
         * 
         * @param {number} from Number from
         * @param {number} to Number to
         * 
         * @returns {number}
         * 
         * @example
         * ~~~
         * 
         * Lightning.Maths.rndFloat(25, 100); // returns a random number between 25 and 100
         * ~~~
         */
        public static rngFloat(from:number, to:number):number {
            return Math.random() * (to - from) + from;
        }

        /**
         * @description Generate random position in a given area
         * 
         * @param {iRec} rectangle Rectangle representing the area defined to generate a random position in
         * 
         * @returns {iPoint}
         * 
         * ~~~
         * 
         * let area:iRec = new Lightning.Rectangle(0, 200, 0, 500); // generates a rectangle 200x500
         * sprite.position = Lightning.Math.rngPos(area); // returns a random position within a rectangle
         * ~~~
         */
        public static rndPos(rectangle:iRec):iPoint {
            return {x: Maths.rngInt(rectangle.x1, rectangle.x2), y: Maths.rngInt(rectangle.y1, rectangle.y2)};
        }

        public static angleBetweenDegs(a, b, c, d) {
            return Math.atan2(d - b, c - a) * 180 / Math.PI;
        }

        /**
         * @description Calculate distance between two positions
         * 
         * @param {iPoint} pos1
         * @param {iPoint} pos2
         * 
         * @returns {iPoint}
         * 
         * @example
         * ~~~
         * 
         * let distance:number = Lightning.Maths.distanceBetween(sprite1, sprite2);
         * ~~~
         */
        public static distanceBetween(obj1:iPoint, obj2:iPoint):number {
            let xs:number = obj1.x - obj2.x;
            let ys:number = obj1.y - obj2.y;
            return Math.sqrt(xs * xs + ys * ys);
        }

        /**
         * FINISH EXAMPLE
         * @description Convert Hex to RGB
         * 
         * @param {number} hex
         * @param {iPoint} pos2
         * 
         * @returns {iPoint}
         * 
         * @example
         * ~~~
         * 
         * let area:iRec = new Lightning.Rectangle(0, 200, 0, 500); // generates a rectangle 200x500
         * sprite.position = Lightning.Math.rngPos(area); // returns a random position within a rectangle
         * ~~~
         */
        public static hexToRGB(hex: any, out: any): any {
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

        public static isEven(val: number) {
            return val % 2;
        }

        /**
         * @description Find the closest value in an array of values
         * 
         * @param {Array<number>} array Array to search through
         * @param {number} value Number to compare it to
         * 
         * @returns {number}
         * 
         * @example
         * ~~~
         * 
         * let ordered = [0, 1, 2, 3, 4, 5];
         * let shuffled = Lightning.Maths.shuffleArray(ordered) // will return shuffled array like [4, 2, 1, 5, 0, 3];
         * ~~~
         */
        public static closestValue(array:Array<number>, value:number):number {
            let low:number;
            let high:number;
            for (var i = array.length; i--;) {
                if(array[i] <= value && (low === undefined || low < array[i])) {
                    low = array[i];
                }

                if(array[i] >= value && (high === undefined || high > array[i])) {
                    high = array[i];
                }
            };

            let diffLow:number = value - low;
            let diffHigh:number = high - value;

            if(diffHigh > diffLow) {
                return low;
            } else {
                return high;
            }
        }

        /**
         * @description Round up to the nearest value
         * 
         * @param {number} number number to be rounded 
         * @param {number} roundTo number to be rounded up to
         * 
         * @returns {number}
         * 
         * @example
         * ~~~
         * 
         * Lightning.Maths.roundUpToNearest(14, 10) // will return 10
         * ~~~
         */
        public static roundUpToNearest(number:number, roundTo:number):number {
            if(number <= 0) {
                return roundTo;
            } else {
                return roundTo * (Math.ceil(Math.abs(number / roundTo)));
            }
        }

        /**
         * @description Round down to the nearest value
         * 
         * @param {number} number number to be rounded 
         * @param {number} roundTo number to be rounded down to
         * 
         * @returns {number}
         * 
         * @example
         * ~~~
         * 
         * Lightning.Maths.roundDownToNearest(14, 10) // will return 10
         * ~~~
         */
        public static roundDownToNearest(number:number, roundTo:number):number {
            if(number <= 0) {
                return 0;
            } else {
                roundTo * (Math.floor(Math.abs(number / roundTo)));
            }
        }

        /**
         * @description Convert degrees to radians
         * 
         * 
         * @param {number} degrees
         * 
         * @returns {number} 
         * 
         * @example 
         * ~~~
         * 
         * Lightning.Math.degreesToRadians(115); // returns 2.007128639793479
         * ~~~
         */
        public static degreesToRadians(degrees:number) {
            return degrees * Math.PI / 180;
        }

        /**
         * @description Convert radians to degrees
         * 
         * 
         * @param {number} radians
         * 
         * @returns {number} 
         * 
         * @example 
         * ~~~
         * 
         * Lightning.Math.radiansToDegrees(0.58); // returns 33.231552117587746
         * ~~~
         */
        public static radiansToDegrees(radians:number): number {
            return radians * 180 / Math.PI;
        }

        /**
         * @description Generate points around a circle
         * 
         * 
         * @param {number} x center of circle x value
         * @param {number} y center of circle y value
         * @param {number} points number of points
         * @param {number} radius radius of circle 
         * 
         * 
         * @returns {{x: number[], y: number[]}} 
         * 
         * @example 
         * ~~~
         * let circlePoints = Lightning.Maths.pointsOfCircle(150, 150, 25, 50); // returns array of x and y values
         * 
         * ~~~
         */
        public static pointsOfCircle(x, y, points, radius): {x: number[], y: number[]} {
            let aX = [];
            let aY = [];
            
            for(let i = 0; i < points; i++) {
                aX.push(x + radius * Math.cos(2 * Math.PI * i / points));
                aY.push(y + radius * Math.sin(2 * Math.PI * i / points));
            }

            return {x: aX, y: aY};
        }
    }
}