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
        var s = new Lightning.Group();
        this.add(s);
        var g = new Lightning.Graphics();
        g.beginFill(0xff22aa, 1);
        g.drawRect(0, 0, 100, 100);
        s.add(g);
        var tween = this.game.tweens.create('test', g);
        tween.createAnim(0, 300, 1000, 0, 'x', Lightning.Easing.BounceIn);
        tween.start();
        g = new Lightning.Graphics();
        g.beginFill(0xff22aa, 1);
        g.drawRect(0, 0, 100, 100);
        g.x = this.game.width - 100;
        s.add(g);
        g = new Lightning.Graphics();
        g.beginFill(0xff22aa, 1);
        g.drawRect(0, 0, 100, 100);
        g.x = this.game.width - 100;
        g.y = this.game.height - 100;
        s.add(g);
        g = new Lightning.Graphics();
        g.beginFill(0xff22aa, 1);
        g.drawRect(0, 0, 100, 100);
        g.y = this.game.height - 100;
        s.add(g);
        g = new Lightning.Graphics();
        g.beginFill(0xff22aa, 1);
        g.drawRect(0, 0, 100, 100);
        g.x = 430;
        g.y = 220;
        s.add(g);
        g.interactive = true;
        g.on('mousedown', function () {
            _this.game.goFullScreen();
            setTimeout(function () {
                _this.game.scale.alignVertically();
            }, 250);
        });
        g.on('touchend', function () {
            _this.game.goFullScreen();
            setTimeout(function () {
                _this.game.scale.alignVertically();
            }, 250);
        });
    };
    return GameState;
}(Lightning.State));
exports.default = GameState;
