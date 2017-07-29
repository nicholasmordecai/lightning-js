/// <reference path="./../../reference.d.ts" />

namespace Lightning {
    export class KeyboardManager {

        private game:Engine;
        private _enabled:boolean;
        private _keys:{[code:string]:Key};

        constructor(game:Engine) {
            this.game = game;
            this._enabled = true;
            this._keys = {};
            this.bindWindowKeyEvents();
            this.createKeys();
        }

        private bindWindowKeyEvents() {
            window.addEventListener('keydown', this.handleKeyDown.bind(this), true);
            window.addEventListener('keyup', this.handleKeyUp.bind(this), true);
        }

        private handleKeyDown(event:KeyboardEvent) {
            if(this._enabled === false) return;
            let code:number = event.keyCode || event.charCode;
            let key = this.findKey(code);
            if(!key) return;
            key.press();
        }

        private handleKeyUp(event:KeyboardEvent) {
            if(this._enabled === false) return;
            let code:number = event.keyCode || event.charCode;
            let key = this.findKey(code);
            if(!key) return;
            key.release();
        }
        
        public key(keyCode:string):Key {
            return this._keys[keyCode];
        }

        private findKey(code:number) {
            for(let i in this._keys) {
                if(this._keys[i].ascii === code) {
                    return this._keys[i];
                }
            }
            return null;
        }

        private createKeys() {
            let keyPairs:Array<{ascii:number, alias:string}> = [];
            keyPairs.push({ascii:8, alias:'backspace'});
            keyPairs.push({ascii:9, alias:'tab'});
            keyPairs.push({ascii:13, alias:'enter'});
            keyPairs.push({ascii:16, alias:'shift'});
            keyPairs.push({ascii:17, alias:'ctrl'});
            keyPairs.push({ascii:18, alias:'alt'});
            keyPairs.push({ascii:19, alias:'pause/break'});
            keyPairs.push({ascii:20, alias:'caps'});
            keyPairs.push({ascii:27, alias:'escape'});
            keyPairs.push({ascii:32, alias:'space'});
            keyPairs.push({ascii:33, alias:'page up'});
            keyPairs.push({ascii:34, alias:'page down'});
            keyPairs.push({ascii:35, alias:'end'});
            keyPairs.push({ascii:36, alias:'home'});
            keyPairs.push({ascii:37, alias:'left arrow'});
            keyPairs.push({ascii:38, alias:'up arrow'});
            keyPairs.push({ascii:39, alias:'right arrow'});
            keyPairs.push({ascii:40, alias:'down arrow'});
            keyPairs.push({ascii:45, alias:'insert'});
            keyPairs.push({ascii:46, alias:'delete'});
            keyPairs.push({ascii:48, alias:'0'});
            keyPairs.push({ascii:49, alias:'1'});
            keyPairs.push({ascii:50, alias:'2'});
            keyPairs.push({ascii:51, alias:'3'});
            keyPairs.push({ascii:52, alias:'4'});
            keyPairs.push({ascii:53, alias:'5'});
            keyPairs.push({ascii:54, alias:'6'});
            keyPairs.push({ascii:55, alias:'7'});
            keyPairs.push({ascii:56, alias:'8'});
            keyPairs.push({ascii:57, alias:'9'});
            keyPairs.push({ascii:65, alias:'a'});
            keyPairs.push({ascii:66, alias:'b'});
            keyPairs.push({ascii:67, alias:'c'});
            keyPairs.push({ascii:68, alias:'d'});
            keyPairs.push({ascii:69, alias:'e'});
            keyPairs.push({ascii:70, alias:'f'});
            keyPairs.push({ascii:71, alias:'g'});
            keyPairs.push({ascii:72, alias:'h'});
            keyPairs.push({ascii:73, alias:'i'});
            keyPairs.push({ascii:74, alias:'j'});
            keyPairs.push({ascii:75, alias:'k'});
            keyPairs.push({ascii:76, alias:'l'});
            keyPairs.push({ascii:77, alias:'m'});
            keyPairs.push({ascii:78, alias:'n'});
            keyPairs.push({ascii:79, alias:'o'});
            keyPairs.push({ascii:80, alias:'p'});
            keyPairs.push({ascii:81, alias:'q'});
            keyPairs.push({ascii:82, alias:'r'});
            keyPairs.push({ascii:83, alias:'s'});
            keyPairs.push({ascii:84, alias:'t'});
            keyPairs.push({ascii:85, alias:'u'});
            keyPairs.push({ascii:86, alias:'v'});
            keyPairs.push({ascii:87, alias:'w'});
            keyPairs.push({ascii:88, alias:'x'});
            keyPairs.push({ascii:89, alias:'y'});
            keyPairs.push({ascii:90, alias:'z'});
            keyPairs.push({ascii:91, alias:'left window'});
            keyPairs.push({ascii:92, alias:'right window'});
            keyPairs.push({ascii:93, alias:'select'});
            keyPairs.push({ascii:96, alias:'n0'});
            keyPairs.push({ascii:97, alias:'n1'});
            keyPairs.push({ascii:98, alias:'n2'});
            keyPairs.push({ascii:99, alias:'n3'});
            keyPairs.push({ascii:100, alias:'n4'});
            keyPairs.push({ascii:101, alias:'n5'});
            keyPairs.push({ascii:102, alias:'n6'});
            keyPairs.push({ascii:103, alias:'n7'});
            keyPairs.push({ascii:104, alias:'n8'});
            keyPairs.push({ascii:105, alias:'n9'});
            keyPairs.push({ascii:106, alias:'multiply'});
            keyPairs.push({ascii:107, alias:'add'});
            keyPairs.push({ascii:109, alias:'subtract'});
            keyPairs.push({ascii:110, alias:'decimal'});
            keyPairs.push({ascii:111, alias:'divide'});
            keyPairs.push({ascii:112, alias:'f1'});
            keyPairs.push({ascii:113, alias:'f2'});
            keyPairs.push({ascii:114, alias:'f3'});
            keyPairs.push({ascii:115, alias:'f4'});
            keyPairs.push({ascii:116, alias:'f5'});
            keyPairs.push({ascii:117, alias:'f6'});
            keyPairs.push({ascii:118, alias:'f7'});
            keyPairs.push({ascii:119, alias:'f8'});
            keyPairs.push({ascii:120, alias:'f9'});
            keyPairs.push({ascii:121, alias:'f10'});
            keyPairs.push({ascii:122, alias:'f11'});
            keyPairs.push({ascii:123, alias:'f12'});
            keyPairs.push({ascii:144, alias:'num lock'});
            keyPairs.push({ascii:145, alias:'scroll lock'});
            keyPairs.push({ascii:186, alias:'semi-colon'});
            keyPairs.push({ascii:187, alias:'equal'});
            keyPairs.push({ascii:188, alias:'comma'});
            keyPairs.push({ascii:189, alias:'dash'});
            keyPairs.push({ascii:190, alias:'period'});
            keyPairs.push({ascii:191, alias:'forward slash'});
            keyPairs.push({ascii:192, alias:'grave accent'});
            keyPairs.push({ascii:219, alias:'open bracket'});
            keyPairs.push({ascii:220, alias:'back slash'});
            keyPairs.push({ascii:221, alias:'close bracket'});
            keyPairs.push({ascii:222, alias:'single quote'});

            for(let keyData of keyPairs) {
                let key = new Key(keyData.ascii, keyData.alias);
                this._keys[keyData.alias] = key;
            }
        }
    }
}