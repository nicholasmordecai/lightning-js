/// <reference path="./../reference.d.ts" />

/**
 * TODO
 * 1. Order array alphabetically
 */

namespace Lightning {
    export class Utils {
        public static getUrlParameter(name: string, url: string):string {
            if (!url) url = window.location.href;
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        }

        public static randomInArray(array:any[], rangeFrom:number = 0, rangeTo:number = array.length) {
            return array[Maths.rngInt(0, array.length)];
        }

        public static randomString() {
            console.log('hi')
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
        public static uniqueRange(from:number, to:number, count:number, safeNumber:number = count * 5): number[] {
            if(to - from < count) {
                console.error("Can't get unique range, not enough numbers to choose from!");
                return null;
            }
            let range:Array<number> = [];
            let c:number = 0;
            while(range.length < count) {
                let rng = Maths.rngInt(from, to);
                if(!Utils.contains(range, rng)) {
                    range.push(rng);
                }
                if(c > safeNumber) break;
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
    }
}