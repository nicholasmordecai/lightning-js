"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Colours = require("./../utils/colours");
var PlayButton = (function (_super) {
    __extends(PlayButton, _super);
    function PlayButton(game, background) {
        var _this = _super.call(this, game) || this;
        _this.game = game;
        _this.tint = Colours.PURPLE;
        _this.setAnchor(0.5);
        var width = (background.children[70].x - background.children[65].x) + background.children[0].width;
        var height = (background.children[81].y - background.children[64].y) + background.children[0].height;
        _this.x = background.children[65].x - background.children[65].width * 0.5 + width / 2;
        _this.y = background.children[65].y - background.children[65].height * 0.5 + height / 2;
        _this.draw(width, height);
        _this.hit.setRect(width, height);
        _this.hit.x -= width / 2;
        _this.hit.y -= height / 2;
        return _this;
    }
    PlayButton.prototype.draw = function (width, height) {
        var a1 = Lightning.UI.Shapes.Rect(width, height);
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
        var triangle = Lightning.UI.Shapes.Triangle(a1.height * 0.5);
        triangle.x = a1.width / 2 + triangle.width / 2;
        triangle.y = a1.height / 2 - triangle.height / 2;
        triangle.tint = 0x000000;
        triangle.alpha = 0.5;
        triangle.rotation = 1.5708;
        a1.addChild(triangle);
        this.texture = this.game.renderer.generateTexture(a1);
    };
    return PlayButton;
}(Lightning.UI.Button));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PlayButton;
