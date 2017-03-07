"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var backgroundSquare_1 = require("./../prefabs/backgroundSquare");
var Background = (function (_super) {
    __extends(Background, _super);
    function Background(game, view) {
        var _this = _super.call(this) || this;
        _this.game = game;
        _this.draw(view);
        return _this;
    }
    // draw(view:Array<{x:number, y:number, type:string}>) {
    Background.prototype.draw = function (view) {
        var padding = this.game.width * 0.05;
        var width = this.game.width - padding;
        var height = this.game.height - padding;
        var countX = 8;
        var countY = 15;
        var lineWidth = width / countX;
        var lineHeight = height / countY;
        var offsetX = lineWidth / 2 + padding / 2;
        var offsetY = lineHeight / 2 + padding / 2;
        var squareWidth = null;
        if (width * 0.09 > height * 0.05) {
            squareWidth = height * 0.05;
        }
        else {
            squareWidth = width * 0.09;
        }
        for (var y = 0; y < countY; y++) {
            for (var x = 0; x < 8; x++) {
                var type = null;
                for (var _i = 0, view_1 = view; _i < view_1.length; _i++) {
                    var t = view_1[_i];
                    if (t.x === x && t.y === y) {
                        type = t.type;
                        continue;
                    }
                }
                var square = new backgroundSquare_1.default(this.game, squareWidth, x, y, type);
                square.x = offsetX + (lineWidth * x);
                square.y = offsetY + (lineHeight * y);
                this.addChild(square);
            }
        }
    };
    return Background;
}(PIXI.Container));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Background;
