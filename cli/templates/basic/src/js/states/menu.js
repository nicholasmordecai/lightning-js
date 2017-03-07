"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MenuState = (function (_super) {
    __extends(MenuState, _super);
    function MenuState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MenuState.prototype.create = function () {
        this.game.states.destroy('menu');
        this.game.states.start('game');
    };
    return MenuState;
}(Lightning.State));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MenuState;
