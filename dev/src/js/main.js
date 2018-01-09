"use strict";
// /<reference path="./../../../dist/lightning.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var boot_1 = require("./scenes/boot");
var preload_1 = require("./scenes/preload");
// import MenuScene from './scenes/menu';
// import GameScene from './scenes/game';
var Game = /** @class */ (function () {
    function Game(width, height) {
        this.game = new Lightning.Engine(width, height, {
            divID: "app-container",
            rendererOptions: {
                transparent: false
            }
        });
        console.log(boot_1.default);
        this.game.scenes.add('boot', boot_1.default);
        this.game.scenes.add('preload', preload_1.default);
        // this.game.scenes.add('menu', MenuScene);
        // this.game.scenes.add('game', GameScene);
        this.game.scenes.start('boot');
    }
    return Game;
}());
exports.default = Game;
var width = Math.round(document.getElementById("app-container").offsetWidth);
var height = Math.round(width * 0.7);
// new Game(width, height);
window.onload = function () {
    // new Game(450, 667);
    new Game(width, height);
};
// enable the following for cordova!!
// var app = {
//     // Application Constructor
//     initialize: function() {
//         document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
//     },
//     // deviceready Event Handler
//     //
//     // Bind any cordova events here. Common events are:
//     // 'pause', 'resume', etc.
//     onDeviceReady: function() {
//         this.receivedEvent('deviceready');
//     },
//     // Update DOM on a Received Event
//     receivedEvent: function(id) {
//         new Game();
//     }
// };
// app.initialize(); 
