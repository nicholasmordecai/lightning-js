/// <reference path="./../reference.d.ts" />

/**
 * Notes: Need to add a shaddow parameter and function.
 * This should allow the user to set parameters such is 
 * 
 * make a button class that has multiple states for quick dev
 */

namespace Lightning {
    export class Geometry {

        /**
         * @description Draw a square
         * 
         * @param {number} d dimension of the square in pixels
         * 
         * @returns {Lightning.Graphics}
         */

        public static Square(d:number):Lightning.Graphics {
            let graphics = new Lightning.Graphics();
            graphics.beginFill(0xffffff, 1);
            graphics.drawRect(0, 0, d, d);
            graphics.endFill();
            return graphics;
        }

        /**
         * @description Draw a rectangle
         * 
         * @param {number} w width of the rectangle in pixels
         * @param {number} h height of the rectangle in pixels
         * 
         * @returns {Lightning.Graphics}
         */
        public static Rect(w:number, h:number):Lightning.Graphics {
            let graphics = new Lightning.Graphics();
            graphics.beginFill(0xffffff, 1);
            graphics.drawRect(0, 0, w, h);
            graphics.endFill();
            return graphics;
        }

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
        public static Star(cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number): PIXI.Graphics {
            let rot = Math.PI / 2 * 3;
            let x = cx;
            let y = cy;
            let step = Math.PI / spikes;
            let graphics = new PIXI.Graphics();
            graphics.beginFill(0xffffff, 1);
            graphics.moveTo(cx, cy - outerRadius);
            for (let i = 0; i < spikes; i++) {
                x = cx + Math.cos(rot) * outerRadius;
                y = cy + Math.sin(rot) * outerRadius;
                graphics.lineTo(x, y);
                rot += step;

                x = cx + Math.cos(rot) * innerRadius;
                y = cy + Math.sin(rot) * innerRadius;
                graphics.lineTo(x, y);
                rot += step;
            }
            graphics.lineTo(cx, cy - outerRadius)
            graphics.endFill();

            return graphics;
        }

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
        public static Polygon(cx: number, cy: number, sides: number, size: number): PIXI.Graphics {
            let graphics = new PIXI.Graphics();
            // let size = innerRadius * outerRadius / 2;
            graphics.beginFill(0xffffff, 1);
            graphics.moveTo(cx + size * Math.cos(0), cy + size * Math.sin(0));
            for (let i = 1; i <= sides; i += 1) {
                graphics.lineTo(cx + size * Math.cos(i * 2 * Math.PI / sides), cy + size * Math.sin(i * 2 * Math.PI / sides));
            }

            return graphics;
        }

        /**
         * @description Draw a Heart 
         * 
         * @param {number} cx x position 
         * 
         * @returns {Lightning.Graphics}
         */
        public static Heart(ratio: number): PIXI.Graphics {
            let graphics = new PIXI.Graphics();
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
        }

        /**
         * @description Draw a circle
         * 
         * @param {number} r Radius of the circle in pixels
         * 
         * @returns {Lightning.Graphics}
         */
        public static Circle(r: number): PIXI.Graphics {
            // think about how to implement responsive graphic drawings
            r = r * window.devicePixelRatio;
            let graphics = new PIXI.Graphics();
            graphics.beginFill(0xffffff, 1);
            graphics.arc(75, 75, r, 0, Math.PI * 2, false);
            graphics.endFill();
            return graphics;
        }

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
        public static Oval(centerX: number, centerY: number, width: number, height: number): PIXI.Graphics {
            let graphics = new PIXI.Graphics();
            graphics.beginFill(0xffffff, 1);
            graphics.moveTo(centerX, centerY - height / 2);
            graphics.bezierCurveTo(centerX + width / 2, centerY - height / 2, centerX + width / 2, centerY + height / 2, centerX, centerY + height / 2)
            graphics.bezierCurveTo(centerX - width / 2, centerY + height / 2, centerX - width / 2, centerY - height / 2, centerX, centerY - height / 2);
            graphics.endFill();
            return graphics;
        }

        /**
         * @description Draw a Triangle
         * 
         * @param {number} l1 Length of the first triangle side
         * @param {number} l2 Length of the second triangle side
         * 
         * @returns {Lightning.Graphics}
         */
        public static Triangle(l1:number, l2:number = l1):Lightning.Graphics {
            let graphics = new Lightning.Graphics();
            graphics.beginFill(0xffffff, 1);
            graphics.moveTo(l1 * 0.5, 0);
            graphics.lineTo(l2, l1);
            graphics.lineTo(0, l1);
            graphics.lineTo(l1 * 0.5, 0);
            graphics.endFill();
            return graphics;
        }
    }
}