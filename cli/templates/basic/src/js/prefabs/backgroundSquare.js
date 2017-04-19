"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Colours = require("./../utils/colours");
var BGSquare = (function (_super) {
    __extends(BGSquare, _super);
    function BGSquare(game, width, idx, idy, type) {
        var _this = _super.call(this) || this;
        _this.game = game;
        _this.tint = Colours.DARK;
        _this.setAnchor(0.5);
        _this._type = type;
        _this._idx = idx;
        _this._idy = idy;
        _this._initWidth = width;
        _this.createTexture(width);
        _this.typeChange(type);
        return _this;
    }
    BGSquare.prototype.createTexture = function (width) {
        var texture = Lightning.UI.Shapes.Rect(width, width);
        this.texture = this.game.renderer.generateTexture(texture, 0, 2);
    };
    BGSquare.prototype.drawSquare = function () {
        var texture = Lightning.UI.Shapes.Rect(this._initWidth, this._initWidth);
        this.texture = this.game.renderer.generateTexture(texture, 0, 2);
        this.rotation = 0;
    };
    BGSquare.prototype.drawCircle = function () {
        var texture = Lightning.UI.Shapes.Circle(this._initWidth / 2);
        this.tint = Colours.LIGHTBLUE;
        this.texture = this.game.renderer.generateTexture(texture, 0, 2);
    };
    BGSquare.prototype.drawDiamond = function () {
        var texture = Lightning.UI.Shapes.Rect(this._initWidth * 0.8, this._initWidth * 0.8);
        this.rotation = 0.785398;
        this.tint = Colours.DIAMOND;
        this.texture = this.game.renderer.generateTexture(texture, 4, 4);
    };
    BGSquare.prototype.drawStar = function () {
        var texture = Lightning.UI.Shapes.Star(this._initWidth * 0.8, this._initWidth * 0.8);
        var texture2 = Lightning.UI.Shapes.Star(this._initWidth * 0.8, this._initWidth * 0.8);
        texture2.rotation = 0.785398;
        texture2.x += texture2.width * 0.5;
        texture2.y -= texture2.width * 0.25;
        texture.addChild(texture2);
        this.tint = Colours.GOLD;
        this.texture = this.game.renderer.generateTexture(texture);
    };
    BGSquare.prototype.drawWhiteSquare = function () {
        var texture = Lightning.UI.Shapes.Rect(this._initWidth * 1.1, this._initWidth * 1.1);
        this.tint = Colours.WHITE;
        this.texture = this.game.renderer.generateTexture(texture);
    };
    BGSquare.prototype.drawTriangle = function () {
        var texture = Lightning.UI.Shapes.Triangle(this._initWidth * 0.8);
        this.tint = Colours.ORANGE;
        this.texture = this.game.renderer.generateTexture(texture);
    };
    BGSquare.prototype.typeChange = function (type) {
        switch (type) {
            case 'circle':
                this._type = 'circle';
                this.drawCircle();
                break;
            case 'star':
                this._type = 'star';
                this.drawStar();
                break;
            case 'triangle':
                this._type = 'triangle';
                this.drawTriangle();
                break;
            case 'diamond':
                this._type = 'diamond';
                this.drawDiamond();
                break;
            case 'whiteSquare':
                this._type = 'whiteSquare';
                this.drawWhiteSquare();
                break;
            case 'blank':
                this._type = 'blank';
                this.alpha = 0;
                break;
            case 'normal':
                this._type = 'normal';
                this.drawSquare();
                this.alpha = 1;
                this.tint = Colours.DARK;
                break;
        }
    };
    Object.defineProperty(BGSquare.prototype, "idx", {
        get: function () {
            return this._idx;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BGSquare.prototype, "idy", {
        get: function () {
            return this._idy;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BGSquare.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    return BGSquare;
}(Lightning.UI.Sprite));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BGSquare;
