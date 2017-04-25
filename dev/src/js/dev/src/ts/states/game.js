"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var GameState = (function (_super) {
    __extends(GameState, _super);
    function GameState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameState.prototype.create = function () {
        var _this = this;
        var cPos = 0;
        var posData = [];
        var width = 300;
        var height = 200;
        var segmentation = 20;
        var maxSegmentsToShow = 15;
        var wInc = width / segmentation;
        var minLineHeight = height * 0.85;
        var maxLineHeight = height * 0.15;
        var paddingTop = height * 0.15;
        var g = Lightning.Geometry.Rect(width, height);
        g.tint = 0x1a1a1a;
        var sprite = new Lightning.Sprite(this.game.generateTexture(g));
        this.addChild(sprite);
        sprite.enableDrag(true);
        var line = new Lightning.Sprite(null);
        sprite.addChild(line);
        var t = new Lightning.Timer(this.game);
        t.interval = 500;
        t.events.subscribe('tick', function () {
            // let fps = Math.round(this.game.fps);
            var fps = Math.floor(Math.random() * 60) + 0;
            if (cPos >= maxSegmentsToShow) {
                posData.splice(0, 1);
            }
            posData.push(fps);
            var nLine = new Lightning.Graphics();
            nLine.lineStyle(1, 0xffa500, 1);
            nLine.moveTo(0, 0);
            var c = 0;
            var flag = false;
            var s = 100 / 60;
            var dist = minLineHeight - maxLineHeight;
            for (var _i = 0, posData_1 = posData; _i < posData_1.length; _i++) {
                var i = posData_1[_i];
                var drawWidth = c * wInc;
                var percentage = i * s / 100;
                var drawHeight = (dist - (dist * percentage) + paddingTop);
                nLine.lineTo(drawWidth, drawHeight);
                // console.log(this.game.debug.)
                c++;
            }
            line.texture = _this.game.generateTexture(nLine);
            if (cPos < 20) {
                cPos++;
            }
        });
    };
    return GameState;
}(Lightning.State));
exports.default = GameState;
