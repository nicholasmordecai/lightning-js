/// <reference path="./../reference.d.ts" />
/**
 * Notes: Need to add a shaddow parameter and function.
 * This should allow the user to set parameters such is
 *
 * make a button class that has multiple states for quick dev
 */
var Lightning;
(function (Lightning) {
    var Geometry = (function () {
        function Geometry() {
        }
        /**
         * @description Draw a square
         *
         * @param {number} d dimension of the square in pixels
         *
         * @returns {Lightning.Graphics}
         */
        Geometry.Square = function (d) {
            var graphics = new Lightning.Graphics();
            graphics.beginFill(0xffffff, 1);
            graphics.drawRect(0, 0, d, d);
            graphics.endFill();
            return graphics;
        };
        /**
         * @description Draw a rectangle
         *
         * @param {number} w width of the rectangle in pixels
         * @param {number} h height of the rectangle in pixels
         *
         * @returns {Lightning.Graphics}
         */
        Geometry.Rect = function (w, h) {
            var graphics = new Lightning.Graphics();
            graphics.beginFill(0xffffff, 1);
            graphics.drawRect(0, 0, w, h);
            graphics.endFill();
            return graphics;
        };
        /**
         * @description Draw a Star (double square)
         *
         * @param {number} w width of the rectangle in pixels
         * @param {number} h height of the rectangle in pixels
         *
         * @returns {Lightning.Graphics}
         */
        Geometry.Star = function (w, h) {
            var graphics = new Lightning.Graphics();
            graphics.beginFill(0xffffff, 1);
            graphics.drawRect(0, 0, w, h);
            graphics.endFill();
            return graphics;
        };
        /**
         * @description Draw a 3d rectangle
         *
         * @param {number} w width of the rectangle in pixels
         * @param {number} h height of the rectangle in pixels
         * @param {number} d depth of rectangle in pixels
         *
         * @returns {Lightning.Graphics}
         */
        Geometry.Rect3D = function (w, h, d) {
            w *= 2, h *= 2, d *= 2;
            var graphics = new Lightning.Graphics();
            // draw front
            graphics.beginFill(0xffffff, 1);
            graphics.drawRect(0, 0, w, h);
            graphics.endFill();
            // draw top side
            var topSide = new Lightning.Graphics();
            topSide.beginFill(0xd2d2d2, 1);
            topSide.moveTo(0, 0);
            topSide.lineTo(d, -d);
            topSide.lineTo(w + d, -d);
            topSide.lineTo(w, 0);
            topSide.lineTo(0, 0);
            topSide.endFill();
            graphics.addChild(topSide);
            //draw right ride
            var rightSide = new Lightning.Graphics();
            rightSide.beginFill(0xababab, 1);
            rightSide.moveTo(w, 0);
            rightSide.lineTo(w + d, -d);
            rightSide.lineTo(w + d, h - d);
            rightSide.lineTo(w, h);
            rightSide.lineTo(w, 0);
            rightSide.endFill();
            graphics.addChild(rightSide);
            return graphics;
        };
        /**
         * @description Draw a circle
         *
         * @param {number} r Radius of the circle in pixels
         *
         * @returns {Lightning.Graphics}
         */
        Geometry.Circle = function (r) {
            var graphics = new Lightning.Graphics();
            graphics.beginFill(0xffffff, 1);
            graphics.arc(75, 75, r, 0, Math.PI * 2, false);
            graphics.endFill();
            return graphics;
        };
        /**
         * @description Draw a Triangle
         *
         * @param {number} l1 Length of the first triangle side
         * @param {number} l2 Length of the second triangle side
         *
         * @returns {Lightning.Graphics}
         */
        Geometry.Triangle = function (l1, l2) {
            if (l2 === void 0) { l2 = l1; }
            var graphics = new Lightning.Graphics();
            graphics.beginFill(0xffffff, 1);
            graphics.moveTo(l1 * 0.5, 0);
            graphics.lineTo(l2, l1);
            graphics.lineTo(0, l1);
            graphics.lineTo(l1 * 0.5, 0);
            graphics.endFill();
            return graphics;
        };
        return Geometry;
    }());
    Lightning.Geometry = Geometry;
})(Lightning || (Lightning = {}));
