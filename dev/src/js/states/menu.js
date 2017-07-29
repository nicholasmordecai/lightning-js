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
        //     let button = new Lightning.Sprite(Lightning.Geometry.Rect(50, 50, 0xff22aa));
        //     this.add(button);
        var _this = this;
        var sound = this.game.audio.load('meeseeks', ['audio.mp3']);
        this.game.keyboard.key('space').subscribe('pressed', function () {
            sound.play();
        });
        this.game.keyboard.key('a').subscribeOnce('pressed', function () {
        });
        this.game.keyboard.key('a').subscribeOnce('pressed', function () {
        });
        var shape = new Lightning.Geometry.MultiShape([
            { shape: 'circle', p1: 50, rotation: Math.PI * 0.2 },
            { shape: 'circle', p1: 35, x: -40, y: -40 },
            { shape: 'circle', p1: 25, x: -60, y: -70 },
            { shape: 'circle', p1: 15, x: -75, y: -95, rotation: Math.PI * 0.2 }
        ]);
        this.add(shape);
        shape.x = this.game.center.x;
        shape.y = this.game.height * 0.5;
        // let tween = this.game.tweens.create(button);
        // tween.createAnim(
        //     0, 300, 1500, 'x', Lightning.Easing.ElasticInOut
        // );
        // tween.start();
        // button.interactive = true;
        // button.on('pointerdown', () => {
        //     console.log('yoo')
        //     this.game.states.start('game');
        // });
        this.particleEmitter = new Lightning.ParticleEmitter(this, 0, this.game.center.y);
        this.add(this.particleEmitter);
        // generate a texture for the particle emitter
        var texture = Lightning.Geometry.Rect(8, 8, 0xff22aa);
        // add that texture to the particle emitter
        this.particleEmitter.add(texture);
        this.particleEmitter.enableDebug();
        this.particleEmitter.x = this.game.center.x;
        this.particleEmitter.y = this.game.center.y;
        this.particleEmitter.preFillPool(300);
        this.particleEmitter.setGravity(0, 0.01);
        this.particleEmitter.setVelocityRange(-0.3, 0.3, -0.3, 0.3);
        this.particleEmitter.setInterval(50);
        // this.particleEmitter.addToLocal = false;
        this.particleEmitter.setRotationIncrement(-0.1, 0.1);
        this.particleEmitter.setStrength(2);
        setTimeout(function () {
            _this.particleEmitter.start();
        }, 1500);
    };
    MenuState.prototype.update = function () {
    };
    return MenuState;
}(Lightning.State));
exports.default = MenuState;
