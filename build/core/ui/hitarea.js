/// <reference path="./../../reference.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lightning;
(function (Lightning) {
    var UI;
    (function (UI) {
        var HitArea = (function (_super) {
            __extends(HitArea, _super);
            /**
             *
             * @param game
             * @returns {HitArea}
             */
            function HitArea(game, width, height) {
                var _this = _super.call(this) || this;
                _this._debug = false;
                _this.game = game;
                _this.interactive = true;
                _this.alpha = 0.2;
                // check if the hitAreaDebug signal exists, if not then create it.
                // then add the debug function to that signal.
                if (_this.game.signals.has('hitAreaDebug')) {
                    _this.game.signals.add('hitAreaDebug', _this.debug, _this);
                }
                else {
                    _this.game.signals.create('hitAreaDebug');
                    _this.game.signals.add('hitAreaDebug', _this.debug, _this);
                }
                _this.beginFill(0xffffff, 1);
                _this.drawRect(0, 0, width, height);
                _this.endFill();
                return _this;
            }
            HitArea.prototype.setRect = function (width, height) {
            };
            HitArea.prototype.setCircle = function (radius) {
            };
            /**
             * @description Pass a function to be added to the click events
             * @param fnct
             */
            HitArea.prototype.onClick = function (fnct) {
                this.on('click', fnct);
            };
            /**
             * @description Pass a function to be added to the mouse, pointer and touch down events
             * @param fnct
             */
            HitArea.prototype.down = function (fnct) {
                this.on('mousedown', fnct);
                this.on('touchend', fnct);
                if (this['pointertap'] !== undefined) {
                    this.on('pointertap', fnct);
                }
                if (this['pointerdown'] !== undefined) {
                    this.on('pointerdown', fnct);
                }
            };
            /**
             * @description Pass a function to be added to the mouse, touch and pointer up events
             * @param fnct
             */
            HitArea.prototype.up = function (fnct) {
                this.on('mouseup', fnct);
                this.on('touchend', fnct);
                if (this['pointerup'] !== undefined) {
                    this.on('pointerup', fnct);
                }
            };
            /**
             * @description Pass a function to be added to the mouse, pointer and touch up outside events
             * @param fnct
             */
            HitArea.prototype.upOutside = function (fnct) {
                this.on('mouseupoutside', fnct);
                this.on('touchendoutside', fnct);
                if (this['pointerupoutside'] !== undefined) {
                    this.on('pointerupoutside', fnct);
                }
            };
            /**
             * @description Pass a function to be added to the mouse and pointer over events
             * @param fnct
             */
            HitArea.prototype.over = function (fnct) {
                this.on('mouseover', fnct);
                if (this['pointerover'] !== undefined) {
                    this.on('pointerover', fnct);
                }
            };
            /**
             * @description Pass a function to be added to the mouse and pointer out events
             * @param fnct
             */
            HitArea.prototype.out = function (fnct) {
                this.on('mouseout', fnct);
                if (this['pointerout'] !== undefined) {
                    this.on('pointerout', fnct);
                }
            };
            /**
             * @description Pass a function to be added to the mouse and pointer move event
             * @param fnct
             */
            HitArea.prototype.move = function (fnct) {
                this.on('mousemove', fnct);
                if (this['pointermove'] !== undefined) {
                    this.on('pointermove', fnct);
                }
            };
            /**
             * @description Pass a function to be added to the right click events
             * @param fnct
             */
            HitArea.prototype.rightClick = function (fnct) {
                this.on('rightclick', fnct);
            };
            /**
             * @description Pass a function to be added to the right down events
             * @param fnct
             */
            HitArea.prototype.rightDown = function (fnct) {
                this.on('rightdown', fnct);
            };
            /**
             * @description Pass a function to be added to the right up events
             * @param fnct
             */
            HitArea.prototype.rightUp = function (fnct) {
                this.on('rightup', fnct);
            };
            /**
             * @description Pass a function to be added to the right up outside events
             * @param fnct
             */
            HitArea.prototype.rightUpOutside = function (fnct) {
                this.on('rightupoutside', fnct);
            };
            /**
             * @description Pass a function to be added to the tap event
             *
             * @param fnct
             */
            HitArea.prototype.onTap = function (fnct) {
                this.on('tap', fnct);
            };
            /**
             * @description Sets the debug enabled / disabled and the alpha to 0.5 accordingly
             *
             * @param {Array} data passed in from the signal dispatch event
             */
            HitArea.prototype.debug = function (data) {
                /**
                 * data [0] = true / false - debug mode enabled
                 */
                if (data[0]) {
                    this._debug = true;
                    this.alpha = 0.5;
                }
                else {
                    this._debug = false;
                    this.alpha = 0;
                }
            };
            return HitArea;
        }(PIXI.Graphics));
        UI.HitArea = HitArea;
    })(UI = Lightning.UI || (Lightning.UI = {}));
})(Lightning || (Lightning = {}));
//# sourceMappingURL=hitarea.js.map