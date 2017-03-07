"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Cube = (function (_super) {
    __extends(Cube, _super);
    function Cube(game) {
        var _this = _super.call(this, null) || this;
        _this.game = game;
        var shape = Lightning.Geometry.Rect3D(100, 50, 25);
        _this.texture = _this.game.renderer.generateTexture(shape);
        _this.tint = 0xA134F6;
        return _this;
    }
    return Cube;
}(Lightning.Sprite));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Cube;
