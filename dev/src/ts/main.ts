// <reference path="./../../../dist/lightning.d.ts" />

import BootState from './states/boot';
import PreloadState from './states/preload';
import MenuState from './states/menu';
import GameState from './states/game';

export default class Game {

    public game:Lightning.Engine;

    constructor(width:number, height:number, divId:string = 'app') {
        this.game = new Lightning.Engine(width, height, {
            autoStart: false
        });
        this.game.states.add('boot', new BootState());
        this.game.states.add('preload', new PreloadState());
        this.game.states.add('menu', new MenuState());
        this.game.states.add('game', new GameState());
        this.game.states.start('boot');
    }
}

// let width = Math.round(document.getElementById("app-container").offsetWidth);
// let height = Math.round(width * 0.7);
// new Game(width, height);
window.onload = () => {
    new Game(window.innerWidth, window.innerHeight);
}

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