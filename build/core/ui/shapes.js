/// <reference path="./../../reference.d.ts" />
var Lightning;
(function (Lightning) {
    var UI;
    (function (UI) {
        var Shapes;
        (function (Shapes) {
            /**
             * @description Draw a square
             *
             * @param {number} d dimension of the square in pixels
             *
             * @returns {PIXI.Graphics}
             */
            function Square(d) {
                var graphics = new PIXI.Graphics();
                graphics.beginFill(0xffffff, 1);
                graphics.drawRect(0, 0, d, d);
                graphics.endFill();
                return graphics;
            }
            Shapes.Square = Square;
            /**
             * @description Draw a rectangle
             *
             * @param {number} w width of the rectangle in pixels
             * @param {number} h height of the rectangle in pixels
             *
             * @returns {PIXI.Graphics}
             */
            function Rect(w, h) {
                var graphics = new PIXI.Graphics();
                graphics.beginFill(0xffffff, 1);
                graphics.drawRect(0, 0, w, h);
                graphics.endFill();
                return graphics;
            }
            Shapes.Rect = Rect;
            /**
             * @description Draw a Star (double square)
             *
             * @param {number} w width of the rectangle in pixels
             * @param {number} h height of the rectangle in pixels
             *
             * @returns {PIXI.Graphics}
             */
            function Star(w, h) {
                var graphics = new PIXI.Graphics();
                graphics.beginFill(0xffffff, 1);
                graphics.drawRect(0, 0, w, h);
                graphics.endFill();
                return graphics;
            }
            Shapes.Star = Star;
            /**
             * @description Draw a 3d rectangle
             *
             * @param {number} w width of the rectangle in pixels
             * @param {number} h height of the rectangle in pixels
             * @param {number} d depth of rectangle in pixels
             *
             * @returns {PIXI.Graphics}
             */
            function Rect3D(w, h, d) {
                w *= 2, h *= 2, d *= 2;
                var graphics = new PIXI.Graphics();
                // draw front
                graphics.beginFill(0xffffff, 1);
                graphics.drawRect(0, 0, w, h);
                graphics.endFill();
                // draw top side
                var topSide = new PIXI.Graphics();
                topSide.beginFill(0xd2d2d2, 1);
                topSide.moveTo(0, 0);
                topSide.lineTo(d, -d);
                topSide.lineTo(w + d, -d);
                topSide.lineTo(w, 0);
                topSide.lineTo(0, 0);
                topSide.endFill();
                graphics.addChild(topSide);
                //draw right ride
                var rightSide = new PIXI.Graphics();
                rightSide.beginFill(0xababab, 1);
                rightSide.moveTo(w, 0);
                rightSide.lineTo(w + d, -d);
                rightSide.lineTo(w + d, h - d);
                rightSide.lineTo(w, h);
                rightSide.lineTo(w, 0);
                rightSide.endFill();
                graphics.addChild(rightSide);
                return graphics;
            }
            Shapes.Rect3D = Rect3D;
            /**
             * @description Draw a circle
             *
             * @param {number} r Radius of the circle in pixels
             *
             * @returns {PIXI.Graphics}
             */
            function Circle(r) {
                var graphics = new PIXI.Graphics();
                graphics.beginFill(0xffffff, 1);
                graphics.arc(75, 75, r, 0, Math.PI * 2, false);
                graphics.endFill();
                return graphics;
            }
            Shapes.Circle = Circle;
            /**
             * @description Draw a Triangle
             *
             * @param {number} l1 Length of the first triangle side
             * @param {number} l2 Length of the second triangle side
             *
             * @returns {PIXI.Graphics}
             */
            function Triangle(l1, l2) {
                if (l2 === void 0) { l2 = l1; }
                var graphics = new PIXI.Graphics();
                graphics.beginFill(0xffffff, 1);
                graphics.moveTo(l1 * 0.5, 0);
                graphics.lineTo(l2, l1);
                graphics.lineTo(0, l1);
                graphics.lineTo(l1 * 0.5, 0);
                graphics.endFill();
                return graphics;
            }
            Shapes.Triangle = Triangle;
        })(Shapes = UI.Shapes || (UI.Shapes = {}));
    })(UI = Lightning.UI || (Lightning.UI = {}));
})(Lightning || (Lightning = {}));
//# sourceMappingURL=shapes.js.map