"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var boot_1 = require("./states/boot");
var preload_1 = require("./states/preload");
var menu_1 = require("./states/menu");
var game_1 = require("./states/game");
var Game = (function () {
    function Game(width, height, divId) {
        if (width === void 0) { width = 500; }
        if (height === void 0) { height = 500; }
        if (divId === void 0) { divId = 'app'; }
        this.game = new Lightning.Engine(width, height, divId);
        this.game.states.add('boot', new boot_1.default(this.game));
        this.game.states.add('preload', new preload_1.default(this.game));
        this.game.states.add('menu', new menu_1.default(this.game));
        this.game.states.add('game', new game_1.default(this.game));
        this.game.states.start('boot');
    }
    return Game;
}());
exports.default = Game;
// let width = Math.round(document.getElementById("app-container").offsetWidth);
// let height = Math.round(width * 0.7);
// new Game(width, height);
new Game(960, 540);
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
