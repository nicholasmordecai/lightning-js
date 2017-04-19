/// <reference path="../../../src/reference.d.ts" />
/**
 * Notes: Need to add a shaddow parameter and function.
 * This should allow the user to set parameters such is
 *
 * make a button class that has multiple states for quick dev
 */
declare namespace Lightning {
    class Geometry {
        /**
         * @description Draw a square
         *
         * @param {number} d dimension of the square in pixels
         *
         * @returns {Lightning.Graphics}
         */
        static Square(d: number): PIXI.Graphics;
        /**
         * @description Draw a rectangle
         *
         * @param {number} w width of the rectangle in pixels
         * @param {number} h height of the rectangle in pixels
         *
         * @returns {Lightning.Graphics}
         */
        static Rect(w: number, h: number): PIXI.Graphics;
        /**
         * @description Draw a Star (double square)
         *
         * @param {number} w width of the rectangle in pixels
         * @param {number} h height of the rectangle in pixels
         *
         * @returns {Lightning.Graphics}
         */
        static Star(w: number, h: number): PIXI.Graphics;
        /**
         * @description Draw a 3d rectangle
         *
         * @param {number} w width of the rectangle in pixels
         * @param {number} h height of the rectangle in pixels
         * @param {number} d depth of rectangle in pixels
         *
         * @returns {Lightning.Graphics}
         */
        static Rect3D(w: number, h: number, d: number): PIXI.Graphics;
        /**
         * @description Draw a circle
         *
         * @param {number} r Radius of the circle in pixels
         *
         * @returns {Lightning.Graphics}
         */
        static Circle(r: number): PIXI.Graphics;
        /**
         * @description Draw a Triangle
         *
         * @param {number} l1 Length of the first triangle side
         * @param {number} l2 Length of the second triangle side
         *
         * @returns {Lightning.Graphics}
         */
        static Triangle(l1: number, l2?: number): PIXI.Graphics;
    }
}
