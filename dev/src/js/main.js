// <reference path="./../../../dist/lightning.d.ts" />
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var boot_1 = require("./states/boot");
var preload_1 = require("./states/preload");
var menu_1 = require("./states/menu");
var game_1 = require("./states/game");
var Game = (function () {
    function Game(width, height, divId) {
        if (divId === void 0) { divId = 'app'; }
        this.game = new Lightning.Engine(width, height, {
            rendererOptions: {
                transparent: false
            }
        });
        this.game.states.add('boot', new boot_1.default());
        this.game.states.add('preload', new preload_1.default());
        this.game.states.add('menu', new menu_1.default());
        this.game.states.add('game', new game_1.default());
        this.game.states.start('boot');
    }
    return Game;
}());
exports.default = Game;
// let width = Math.round(document.getElementById("app-container").offsetWidth);
// let height = Math.round(width * 0.7);
// new Game(width, height);
window.onload = function () {
    new Game(window.innerWidth, window.innerHeight);
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
