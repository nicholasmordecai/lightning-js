"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PreloadState = (function (_super) {
    __extends(PreloadState, _super);
    function PreloadState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PreloadState.prototype.create = function () {
        this.game.states.destroy('preload');
        this.game.states.start('menu');
    };
    return PreloadState;
}(Lightning.State));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PreloadState;
