"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Colours = require("./../utils/colours");
var HelpButton = (function (_super) {
    __extends(HelpButton, _super);
    function HelpButton(game, background) {
        var _this = _super.call(this, game) || this;
        _this.game = game;
        _this.tint = Colours.DIAMOND;
        _this.setAnchor(0.5);
        var width = (background.children[67].x - background.children[65].x) + background.children[0].width;
        var height = (background.children[81].y - background.children[64].y) + background.children[0].height;
        _this.x = background.children[100].x - background.children[97].width * 0.5 + width / 2;
        _this.y = background.children[91].y - background.children[91].height * 0.5 + height / 2;
        _this.draw(width, height);
        return _this;
    }
    HelpButton.prototype.draw = function (width, height) {
        var a1 = Lightning.UI.Shapes.Rect(width, height);
        var icon = new Lightning.UI.Sprite(PIXI.Texture.fromImage('data:image/svg+xml;charset=utf8,<svg id="Heart0.svg" width="150" height="150" version="1.1" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg"><path class="shape" d=" M 150.350000 207.400000 C 199.830000 173.230000 218.600000 154.770000 218.600000 132.560000 C 218.600000 109.500000 201.200000 93.440000 187.880000 92.240000 C 185.670000 92.070000 183.620000 91.900000 181.740000 91.900000 C 166.220000 91.900000 158.880000 98.400000 150.350000 108.480000 C 141.820000 98.400000 134.480000 91.900000 118.950000 91.900000 C 117.080000 91.900000 115.030000 92.070000 112.810000 92.240000 C 99.500000 93.440000 82.100000 109.500000 82.100000 132.560000 C 82.100000 154.770000 100.870000 173.230000 150.350000 207.400000 Z"/></svg>', undefined, 0, window.devicePixelRatio));
        // let icon = new UI.Sprite(PIXI.Texture.fromImage('assets/icons/shopIcon.svg', undefined, 0, window.devicePixelRatio));
        icon.tint = 0x000000;
        icon.alpha = 0.4;
        icon.setAnchor(0.5);
        this.addChild(icon);
        var a2 = Lightning.UI.Shapes.Rect(a1.width, a1.height * 0.12);
        a2.y = a1.height * 0.88;
        a2.alpha = 0.3;
        a2.tint = 0x000000;
        a1.addChild(a2);
        var a3 = Lightning.UI.Shapes.Rect(a1.width, a1.height * 0.05);
        a3.y = a1.height * 0.95;
        a3.tint = 0x000000;
        a3.alpha = 0.65;
        a1.addChild(a3);
        this.texture = this.game.renderer.generateTexture(a1);
    };
    return HelpButton;
}(Lightning.UI.Button));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HelpButton;
