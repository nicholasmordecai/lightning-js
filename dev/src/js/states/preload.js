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
var PreloadState = (function (_super) {
    __extends(PreloadState, _super);
    function PreloadState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PreloadState.prototype.create = function () {
        // this.game.states.destroy('preload');
        var g = new Lightning.Graphics();
        g.beginFill(0xff33aa, 1);
        g.drawRect(0, 0, 50, 50);
        g.endFill();
        this.addChild(g);
        // this.game.states.start('menu');
    };
    return PreloadState;
}(Lightning.State));
exports.default = PreloadState;
