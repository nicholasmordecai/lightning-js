"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameState = (function (_super) {
    __extends(GameState, _super);
    function GameState() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.t = 4;
        return _this;
    }
    GameState.prototype.create = function () {
        // create new particle emitter
        this.particleEmitter = new Lightning.ParticleEmitter(this, this.game.center.x, this.game.center.y / 2);
        // add the particle emitter to this stage
        this.add(this.particleEmitter);
        // make a new shape and texture
        var texture = this.game.generateTexture(Lightning.Geometry.Circle(5));
        // add that texture to the particle emitter
        this.particleEmitter.add(texture);
        // We will create 15 new particles on every emit
        this.particleEmitter.setStrength(50);
        // enable the debug module
        this.particleEmitter.enableDebug();
        // start the particle emitter (not passing any parameters will make it run indefinitly)
        this.particleEmitter.start();
    };
    GameState.prototype.test = function () {
    };
    return GameState;
}(Lightning.State));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GameState;
