/// <reference path="./../reference.d.ts" />

/**
 * TODO
 * Unique Between
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
         * @description Round an array in a random order
         * 
         * @param {Array<any>} array Array to be shuffled 
         * 
         * @returns {Array<any>}
         * 
         * @example
         * ~~~
         * 
         * let ordered = [0, 1, 2, 3, 4, 5];
         * let shuffled = Lightning.Maths.shuffleArray(ordered) // will return shuffled array like [4, 2, 1, 5, 0, 3];
         * ~~~
         */
        public static shuffleArray(array:Array<any>) {
            var currentIndex = array.length, temporaryValue, randomIndex;
            // While there remain elements to shuffle...
            while (0 !== currentIndex) {
                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }
            return array;
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
         * @description Return a unique array of number between two points. 
         * Pass an optional safeNumber which cuts the while loop out if you enter an infinite loop.
         * This is set to 5 times your total number, which I do not recommend you remove!
         * 
         * 
         * @param {number} From Unique starting position
         * @param {number} To Unique ending position
         * @param {number} count Number of unique values
         * @param {number} SafeNumber Maximum iterations before breaking out of the while loop
         * 
         * @returns {boolean}
         * 
         * @example 
         * ~~~
         * 
         * Lightning.Maths.uniqueRange(0, 10, 5) // will return an array of 5 unique numbers between 0 and 10
         * ~~~
         */
        public static uniqueRange(from:number, to:number, count:number, safeNumber:number = count * 5) {
            let range:Array<number> = [];
            let c:number = 0;
            while(range.length < count) {
                let rng = this.rngInt(from, to);
                if(!this.contains(range, rng)) {
                    range.push(rng);
                }
                if(c > safeNumber) break;
            }
        }

        /**
         * @description Check an array for an element to see if it exists
         * 
         * 
         * @param {Array<any>} array 
         * @param {any} element 
         * 
         * @returns {boolean}
         * 
         * @example 
         * ~~~
         * 
         * let a:Array<number> = [0, 1, 2, 3, 4]
         * Lightning.Math.contains(a, 3); // returns true
         * Lightning.Math.contains(a, 6) // returns false
         * ~~~
         */
        public static contains(array:Array<any>, element:any):boolean {
             for (var i = 0, len = array.length; i < len; i++) {
                if(array[i] === element) {
                    return true;
                }
            }
            return false;
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
        public static radiansToDegrees(radians:number) {
            return radians * 180 / Math.PI;
        }
    }
}