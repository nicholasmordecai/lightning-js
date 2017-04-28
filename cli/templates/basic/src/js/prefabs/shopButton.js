"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Colours = require("./../utils/colours");
var ShopButton = (function (_super) {
    __extends(ShopButton, _super);
    function ShopButton(game, background) {
        var _this = _super.call(this, game) || this;
        _this.game = game;
        _this.tint = Colours.GOLD;
        _this.setAnchor(0.5);
        var width = (background.children[67].x - background.children[65].x) + background.children[0].width;
        var height = (background.children[81].y - background.children[64].y) + background.children[0].height;
        _this.x = background.children[97].x - background.children[97].width * 0.5 + width / 2;
        _this.y = background.children[91].y - background.children[91].height * 0.5 + height / 2;
        _this.draw(width, height);
        return _this;
    }
    ShopButton.prototype.draw = function (width, height) {
        var a1 = Lightning.UI.Shapes.Rect(width, height);
        var icon = new Lightning.UI.Sprite(PIXI.Texture.fromImage('assets/icons/shopIcon.svg', undefined, 0, window.devicePixelRatio));
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
    return ShopButton;
}(Lightning.UI.Button));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ShopButton;
