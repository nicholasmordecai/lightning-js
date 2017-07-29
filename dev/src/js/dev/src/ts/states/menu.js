"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var MenuState = (function (_super) {
    __extends(MenuState, _super);
    function MenuState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MenuState.prototype.create = function () {
        var _this = this;
        var button = Lightning.Geometry.Rect(50, 50);
        button.tint = 0xff22aa;
        this.add(button);
        this.game.keyboard.key('a').subscribeOnce('pressed', function () {
            console.log('I have been pressed mother fucker');
        });
        this.game.keyboard.key('a').subscribeOnce('pressed', function () {
            console.log('here too?');
        });
        button.interactive = true;
        button.on('mousedown', function () {
            _this.game.states.start('game');
        });
    };
    MenuState.prototype.update = function () {
    };
    return MenuState;
}(Lightning.State));
exports.default = MenuState;
