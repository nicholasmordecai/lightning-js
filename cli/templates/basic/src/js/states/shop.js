"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var background_1 = require("./../views/background");
var Views = require("./../utils/backgroundViews");
var ShopState = (function (_super) {
    __extends(ShopState, _super);
    function ShopState(game) {
        return _super.call(this, game) || this;
    }
    ShopState.prototype.init = function (params) {
        this.create();
    };
    ShopState.prototype.create = function () {
        this._background = new background_1.default(this.game, Views.SHOP);
        this.addChild(this._background);
    };
    return ShopState;
}(Lightning.State));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ShopState;
