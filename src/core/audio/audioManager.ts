/// <reference path="./../../reference.d.ts" />

namespace Lightning {

    export class AudioManager extends Plugin {

        protected game:Engine;
        protected _sounds:{[key:string]: Howl};

        /**
         * @description StateManager constructor
         * 
         * @param {Engine} game
         */
        constructor(game:Engine) {
            super(game);
            this.game = game;
            this._sounds = {};
        }

        public load(key:string, src):Howl {

            let sound = new Howl({
                src: src
            });

            this._sounds[key] = sound;
            
            return sound;
        }

        public sound(key:string):Howl {
            if(this._sounds[key]) {
                return this._sounds[key];
            } else {
                console.error('No sound with the key:', key, 'was found!');
                return null;
            }
        }

        public destroy(key:string):boolean {
            let sound = this.sound(key);
            sound.unload();
            return true;
        }

        public play(key:string, loop?: boolean, volume?: number): number {
            let sound = this.sound(key);
            sound.loop(loop);
            return sound.play();
        }

        /**
         * @todo
         * need to implement this function
         * @param key 
         */
        public stop(key:string):boolean {
            // let sound = this.sound(key);
            return true;
        }

        public destroyAll():boolean {
            Howler.unload();
            return true;
        }
    }
}