// /<reference path="./../../../dist/lightning.d.ts" />

import BootScene from './scenes/boot';
import PreloadScene from './scenes/preload';
// import MenuScene from './scenes/menu';
// import GameScene from './scenes/game';

export default class Game {

    public game:Lightning.Engine;

    constructor(width:number, height:number) {

        this.game = new Lightning.Engine(width, height, {
            divID: "app-container",
            rendererOptions: {
                transparent: false
            }
        });

        console.log(BootScene)

        this.game.scenes.add('boot', BootScene);
        this.game.scenes.add('preload', PreloadScene);
        // this.game.scenes.add('menu', MenuScene);
        // this.game.scenes.add('game', GameScene);
        this.game.scenes.start('boot');
    }
}

let width = Math.round(document.getElementById("app-container").offsetWidth);
let height = Math.round(width * 0.7);
// new Game(width, height);
window.onload = () => {
    // new Game(450, 667);
    new Game(width, height);    
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