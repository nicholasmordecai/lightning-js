/// <reference path="../../../src/reference.d.ts" />
declare namespace Lightning.UI {
    namespace Shapes {
        /**
         * @description Draw a square
         *
         * @param {number} d dimension of the square in pixels
         *
         * @returns {PIXI.Graphics}
         */
        function Square(d: number): PIXI.Graphics;
        /**
         * @description Draw a rectangle
         *
         * @param {number} w width of the rectangle in pixels
         * @param {number} h height of the rectangle in pixels
         *
         * @returns {PIXI.Graphics}
         */
        function Rect(w: number, h: number): PIXI.Graphics;
        /**
         * @description Draw a Star (double square)
         *
         * @param {number} w width of the rectangle in pixels
         * @param {number} h height of the rectangle in pixels
         *
         * @returns {PIXI.Graphics}
         */
        function Star(w: number, h: number): PIXI.Graphics;
        /**
         * @description Draw a 3d rectangle
         *
         * @param {number} w width of the rectangle in pixels
         * @param {number} h height of the rectangle in pixels
         * @param {number} d depth of rectangle in pixels
         *
         * @returns {PIXI.Graphics}
         */
        function Rect3D(w: number, h: number, d: number): PIXI.Graphics;
        /**
         * @description Draw a circle
         *
         * @param {number} r Radius of the circle in pixels
         *
         * @returns {PIXI.Graphics}
         */
        function Circle(r: number): PIXI.Graphics;
        /**
         * @description Draw a Triangle
         *
         * @param {number} l1 Length of the first triangle side
         * @param {number} l2 Length of the second triangle side
         *
         * @returns {PIXI.Graphics}
         */
        function Triangle(l1: number, l2?: number): PIXI.Graphics;
    }
}
