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
         * @description Draw a Star
         *
         * @param {number} cx x position
         * @param {number} cy y position
         * @param {number} sprikes number of spikes for star
         * @param {number} outerRadius outer radius of star
         * @param {number} innerRadius inner radius of star
         *
         * @returns {Lightning.Graphics}
         */
        Geometry.Star = function (cx, cy, spikes, outerRadius, innerRadius) {
            var rot = Math.PI / 2 * 3;
            var x = cx;
            var y = cy;
            var step = Math.PI / spikes;
            var graphics = new PIXI.Graphics();
            graphics.beginFill(0xffffff, 1);
            graphics.moveTo(cx, cy - outerRadius);
            for (var i = 0; i < spikes; i++) {
                x = cx + Math.cos(rot) * outerRadius;
                y = cy + Math.sin(rot) * outerRadius;
                graphics.lineTo(x, y);
                rot += step;
                x = cx + Math.cos(rot) * innerRadius;
                y = cy + Math.sin(rot) * innerRadius;
                graphics.lineTo(x, y);
                rot += step;
            }
            graphics.lineTo(cx, cy - outerRadius);
            graphics.endFill();
            return graphics;
        };
        /**
                * @description Draw a Polygon
                *
                * @param {number} cx x position
                * @param {number} cy y position
                * @param {number} sides number of sides for shape
                * @param {number} size size of shape in pixels
                *
                * @returns {Lightning.Graphics}
                */
        Geometry.Polygon = function (cx, cy, sides, size) {
            var graphics = new PIXI.Graphics();
            // let size = innerRadius * outerRadius / 2;
            graphics.beginFill(0xffffff, 1);
            graphics.moveTo(cx + size * Math.cos(0), cy + size * Math.sin(0));
            for (var i = 1; i <= sides; i += 1) {
                graphics.lineTo(cx + size * Math.cos(i * 2 * Math.PI / sides), cy + size * Math.sin(i * 2 * Math.PI / sides));
            }
            return graphics;
        };
        /**
         * @description Draw a Heart
         *
         * @param {number} cx x position
         *
         * @returns {Lightning.Graphics}
         */
        Geometry.Heart = function (ratio) {
            var graphics = new PIXI.Graphics();
            graphics.beginFill(0xffffff, 1);
            graphics.moveTo(75 * ratio, 40 * ratio);
            graphics.bezierCurveTo(75 * ratio, 37 * ratio, 70 * ratio, 25 * ratio, 50 * ratio, 25 * ratio);
            graphics.bezierCurveTo(20 * ratio, 25 * ratio, 20 * ratio, 62.5 * ratio, 20 * ratio, 62.5 * ratio);
            graphics.bezierCurveTo(20 * ratio, 80 * ratio, 40 * ratio, 102 * ratio, 75 * ratio, 120 * ratio);
            graphics.bezierCurveTo(110 * ratio, 102 * ratio, 130 * ratio, 80 * ratio, 130 * ratio, 62.5 * ratio);
            graphics.bezierCurveTo(130 * ratio, 62.5 * ratio, 130 * ratio, 25 * ratio, 100 * ratio, 25 * ratio);
            graphics.bezierCurveTo(85 * ratio, 25 * ratio, 75 * ratio, 37 * ratio, 75 * ratio, 40 * ratio);
            graphics.endFill();
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
            // think about how to implement responsive graphic drawings
            r = r * window.devicePixelRatio;
            var graphics = new PIXI.Graphics();
            graphics.beginFill(0xffffff, 1);
            graphics.arc(75, 75, r, 0, Math.PI * 2, false);
            graphics.endFill();
            return graphics;
        };
        /**
         * @description Draw a oval
         *
         * @param {number} centerX center for x position
         * @param {number} centerY center for y position
         * @param {number} width width of the oval in pixels
         * @param {number} height height of the oval in pixels
         *
         * @returns {Lightning.Graphics}
         */
        Geometry.Oval = function (centerX, centerY, width, height) {
            var graphics = new PIXI.Graphics();
            graphics.beginFill(0xffffff, 1);
            graphics.moveTo(centerX, centerY - height / 2);
            graphics.bezierCurveTo(centerX + width / 2, centerY - height / 2, centerX + width / 2, centerY + height / 2, centerX, centerY + height / 2);
            graphics.bezierCurveTo(centerX - width / 2, centerY + height / 2, centerX - width / 2, centerY - height / 2, centerX, centerY - height / 2);
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
