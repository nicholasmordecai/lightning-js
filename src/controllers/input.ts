/// <reference path="./../reference.d.ts" />

namespace Lightning {
    export class Input {

        protected game:Engine;
        
        private window:Window;
        private key:any;

        constructor(game:Engine) {
            this.game = game;
            this.window = window.parent || window;
            // found an issue using keyboard input inside an iframe.. need to fix asap!
            //this.window.addEventListener('keydown', this.onKeyDown);
        }

        onKeyDown(key:Event) {
            console.log(key)
        }

        addKey(keyCode:string, fn:Function) {
            var key:any = {};
            key.code = keyCode;
            key.isDown = false;
            key.isUp = true;
            key.press = undefined;
            key.release = undefined;
            //The `downHandler`
            key.downHandler = function(event) {
                if (event.keyCode === key.code) {
                if (key.isUp && key.press) key.press();
                key.isDown = true;
                key.isUp = false;
                }
                event.preventDefault();
            };

            //The `upHandler`
            key.upHandler = function(event) {
                if (event.keyCode === key.code) {
                if (key.isDown && key.release) key.release();
                key.isDown = false;
                key.isUp = true;
                }
                event.preventDefault();
            };
        }
    }
}

// var realWindow = window.parent || window;
// realWindow.addEventListener(    "keydown", key.downHandler.bind(key), false  ); 
// realWindow.addEventListener(    "keyup", key.upHandler.bind(key), false  );