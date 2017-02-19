/// <reference path="./../reference.d.ts" />

namespace Lightning {
    export class Maths {

        public static rngInt(from:number, to:number) {
            return Math.floor(Math.random() * (to - from) + from);  
        }

        public static rng(negative:boolean = false) {
            if(negative) {
                return Math.random();
            } else {
                return -Math.random();
            }
        }

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