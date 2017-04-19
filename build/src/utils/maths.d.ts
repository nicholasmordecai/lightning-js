/// <reference path="../../../src/reference.d.ts" />
declare namespace Lightning {
    class Maths {
        /**
         * Rng's seem to perform a little crappy. Should think about making some sort of RNG pool??
         * - An array of pre-randomized numbers, then shuffeled randly. You then index your way through little
         * - just simply picking the next number in sequence.
         */
        /**
         * @description generate a random integer between two values
         * @param  {number} from
         * @param  {number} to
         */
        static rngInt(from: number, to: number): number;
        /**
         * @description generate a random number
         *
         * @param  {boolean=false} negative
         */
        static rng(negative?: boolean): number;
        /**
         * @description generate a random float between two values
         *
         * @param {number} from
         * @param {number} to
         */
        static rngFloat(from: number, to: number): number;
        /**
         * TODO
         * Generate random position in a given area
         *
         * @param {iPoint} from
         * @param {iPoint} to
         *
         * @returns {iPoint}
         */
        static rndPos(): iPoint;
        /**
         * TODO
         * @description Calculate distance between two positions
         *
         * @param {iPoint} pos1
         * @param {iPoint} pos2
         *
         * @returns {iPoint}
         */
        static distanceBetween(obj1: any, obj2: any): any;
        /**
        * TODO
        * @description Convert Hex to RGB
        *
        * @param {iPoint} pos1
        * @param {iPoint} pos2
        *
        * @returns {iPoint}
        */
        static hextoRGB(hex: any, out: any): any;
        /**
        * TODO
        * @description Calculate RGB to Hex
        *
        * @param {iPoint} pos1
        * @param {iPoint} pos2
        *
        * @returns {iPoint}
        */
        static rgbToHex(r: number, g: number, b: number): any;
    }
}
