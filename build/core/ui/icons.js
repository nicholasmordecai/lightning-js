/// <reference path="./../../reference.d.ts" />
var Lightning;
(function (Lightning) {
    var Icons;
    (function (Icons) {
        /**
         * @description Draw a hamburger menu icon
         *
         * @param {number} s size of the icon in pixels
         *
         * @returns {PIXI.Graphics}
         */
        function Hamburger(s) {
            var graphics = new PIXI.Graphics();
            graphics.beginFill(0xffffff, 1);
            graphics.drawRect(0, 0, s, s * 0.15);
            graphics.drawRect(0, s * 0.4, s, s * 0.15);
            graphics.drawRect(0, s * 0.8, s, s * 0.15);
            graphics.endFill();
            return graphics;
        }
        Icons.Hamburger = Hamburger;
    })(Icons = Lightning.Icons || (Lightning.Icons = {}));
})(Lightning || (Lightning = {}));
//# sourceMappingURL=icons.js.map