"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BootState = (function (_super) {
    __extends(BootState, _super);
    function BootState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BootState.prototype.init = function (params) {
        this.game.backgroundColor = 0x4d2ac1;
        this.create();
    };
    BootState.prototype.create = function () {
        this.game.states.destroy('boot');
        this.game.states.start('preload');
    };
    return BootState;
}(Lightning.State));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BootState;
