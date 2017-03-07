"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Colours = require("./../utils/colours");
var PreloadBar = (function (_super) {
    __extends(PreloadBar, _super);
    function PreloadBar(game, background, top) {
        var _this = _super.call(this) || this;
        _this.game = game;
        _this.setAnchor(0, 0.5);
        _this.scale = new PIXI.Point(0, 1);
        var width = _this.game.width;
        var height = (background.children[81].y - background.children[72].y) + background.children[0]['height'];
        _this.draw(width, height);
        _this.y = background.children[80].y - background.children[80]['height'] * 0.5 + top;
        return _this;
    }
    PreloadBar.prototype.draw = function (width, height) {
        var a1 = Lightning.UI.Shapes.Rect(width, height * 0.8);
        a1.y += height * 0.1;
        a1.tint = Colours.PURPLE;
        var a2 = Lightning.UI.Shapes.Rect(a1.width, a1.height * 0.09);
        a2.alpha = 0.1;
        a2.tint = 0x000000;
        a1.addChild(a2);
        var a3 = Lightning.UI.Shapes.Rect(a1.width, a1.height * 0.06);
        a3.y = a1.height * 0.94;
        a3.alpha = 0.1;
        a3.tint = 0x000000;
        a1.addChild(a3);
        this.texture = this.game.renderer.generateTexture(a1);
    };
    return PreloadBar;
}(Lightning.UI.Sprite));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PreloadBar;
