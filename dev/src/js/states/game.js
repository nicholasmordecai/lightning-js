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
        var s = new Lightning.Group();
        this.add(s);
        var g = new Lightning.Graphics();
        g.beginFill(0xff22aa, 1);
        g.drawRect(0, 0, 100, 100);
        s.add(g);
        var tween = this.game.tweens.create('test', g);
        tween.createAnim(0, 300, 1000, 0, 'x', Lightning.Easing.inOutCirc);
        var tween2 = this.game.tweens.create('test2', g);
        tween2.createAnim(300, 0, 1000, 0, 'x', Lightning.Easing.inOutCirc);
        tween.chain(tween2);
        tween.start();
    };
    return GameState;
}(Lightning.State));
exports.default = GameState;
