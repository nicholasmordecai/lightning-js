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
var MenuState = (function (_super) {
    __extends(MenuState, _super);
    function MenuState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MenuState.prototype.create = function () {
        var _this = this;
        var button = Lightning.Geometry.Rect(50, 50);
        button.tint = 0xff22aa;
        this.add(button);
        var sound = this.game.audio.load('meeseeks', ['audio.mp3']);
        this.game.keyboard.key('space').subscribe('pressed', function () {
            sound.play();
        });
        this.game.keyboard.key('a').subscribeOnce('pressed', function () {
            // console.log('I have been pressed mother fucker');
        });
        this.game.keyboard.key('a').subscribeOnce('pressed', function () {
            // console.log('here too?');
        });
        button.interactive = true;
        button.on('pointerdown', function () {
            console.log('yoo');
            _this.game.states.start('game');
        });
        this.particleEmitter = new Lightning.ParticleEmitter(this, 0, this.game.center.y);
        this.add(this.particleEmitter);
        // generate a texture for the particle emitter
        var texture = Lightning.Geometry.Rect(8, 8).generateCanvasTexture();
        // add that texture to the particle emitter
        this.particleEmitter.add(texture);
        this.particleEmitter.enableDebug();
        this.particleEmitter.setGravity(0, 0.01);
        this.particleEmitter.setVelocityRange(-0.3, 0.3, -0.3, 0.3);
        this.particleEmitter.setInterval(50);
        this.particleEmitter.addToLocal = false;
        this.particleEmitter.setRotationIncrement(-0.1, 0.1);
        this.particleEmitter.setStrength(2);
        this.particleEmitter.start();
    };
    MenuState.prototype.update = function () {
    };
    return MenuState;
}(Lightning.State));
exports.default = MenuState;
