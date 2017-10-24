// /<reference path="./../../../dist/lightning.d.ts" />

import BootScene from './scenes/boot';
import PreloadScene from './scenes/preload';
import MenuScene from './scenes/menu';
import GameScene from './scenes/game';

export default class Game {

    public game:Lightning.Engine;

    constructor(width:number, height:number, divId:string = 'app') {
        this.game = new Lightning.Engine(width, height);
        this.game.scenes.add('boot', new BootScene());
        this.game.scenes.add('preload', new PreloadScene());
        this.game.scenes.add('menu', new MenuScene());
        this.game.scenes.add('game', new GameScene());
        this.game.scenes.start('boot');
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