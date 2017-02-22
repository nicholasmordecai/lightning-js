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
         * @param  {number} from
         * @param  {number} to
         */
        public static rngFloat(from:number, to:number) {
            return Math.random() * (to - from) + from;  
        }

        /**
         * To Implement 
         * random between two positions
         */
        public static rndPos() {

        }
    }
}2