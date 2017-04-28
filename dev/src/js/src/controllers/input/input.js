/// <reference path="./../../reference.d.ts" />
var Lightning;
(function (Lightning) {
    var Input = (function () {
        function Input(parent) {
            this.parent = parent;
        }
        /**
         * @description Pass a function to be added to the click events
         * @param fnct
         */
        Input.prototype.onClick = function (fnct) {
            this.parent.on('click', fnct);
        };
        /**
         * @description Pass a function to be added to the mouse, pointer and touch down events
         * @param fnct
         */
        Input.prototype.down = function (fnct) {
            this.parent.on('mousedown', fnct);
            this.parent.on('touchend', fnct);
            if (this['pointertap'] !== undefined) {
                this.parent.on('pointertap', fnct);
            }
            if (this['pointerdown'] !== undefined) {
                this.parent.on('pointerdown', fnct);
            }
        };
        /**
         * @description Pass a function to be added to the mouse, touch and pointer up events
         * @param fnct
         */
        Input.prototype.up = function (fnct) {
            this.parent.on('mouseup', fnct);
            this.parent.on('touchend', fnct);
            if (this['pointerup'] !== undefined) {
                this.parent.on('pointerup', fnct);
            }
        };
        /**
         * @description Pass a function to be added to the mouse, pointer and touch up outside events
         * @param fnct
         */
        Input.prototype.upOutside = function (fnct) {
            this.parent.on('mouseupoutside', fnct);
            this.parent.on('touchendoutside', fnct);
            if (this['pointerupoutside'] !== undefined) {
                this.parent.on('pointerupoutside', fnct);
            }
        };
        /**
         * @description Pass a function to be added to the mouse and pointer over events
         * @param fnct
         */
        Input.prototype.over = function (fnct) {
            this.parent.on('mouseover', fnct);
            if (this['pointerover'] !== undefined) {
                this.parent.on('pointerover', fnct);
            }
        };
        /**
         * @description Pass a function to be added to the mouse and pointer out events
         * @param fnct
         */
        Input.prototype.out = function (fnct) {
            this.parent.on('mouseout', fnct);
            if (this['pointerout'] !== undefined) {
                this.parent.on('pointerout', fnct);
            }
        };
        /**
         * @description Pass a function to be added to the mouse and pointer move event
         * @param fnct
         */
        Input.prototype.move = function (fnct) {
            this.parent.on('mousemove', fnct);
            if (this['pointermove'] !== undefined) {
                this.parent.on('pointermove', fnct);
            }
        };
        /**
         * @description Pass a function to be added to the right click events
         * @param fnct
         */
        Input.prototype.rightClick = function (fnct) {
            this.parent.on('rightclick', fnct);
        };
        /**
         * @description Pass a function to be added to the right down events
         * @param fnct
         */
        Input.prototype.rightDown = function (fnct) {
            this.parent.on('rightdown', fnct);
        };
        /**
         * @description Pass a function to be added to the right up events
         * @param fnct
         */
        Input.prototype.rightUp = function (fnct) {
            this.parent.on('rightup', fnct);
        };
        /**
         * @description Pass a function to be added to the right up outside events
         * @param fnct
         */
        Input.prototype.rightUpOutside = function (fnct) {
            this.parent.on('rightupoutside', fnct);
        };
        /**
         * @description Pass a function to be added to the tap event
         *
         * @param fnct
         */
        Input.prototype.onTap = function (fnct) {
            this.parent.on('tap', fnct);
        };
        return Input;
    }());
    Lightning.Input = Input;
})(Lightning || (Lightning = {}));
