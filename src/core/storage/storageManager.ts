/// <reference path="./../../reference.d.ts" />

namespace Lightning {

    export class StorageManager {

        private _isLS:boolean;
        private _map:{[key:string]:any};
        private _forceNoLocalStorage:boolean;
    
        constructor(forceNoLocalStorage:boolean = false) {
            this._isLS = false;
            this._map = {};
            this._forceNoLocalStorage = false;

            if(this.localStorageAvailable()) {
                this._isLS = true;
            }
        }

        /**
         * 
         * @param key 
         * @param val 
         */
        public setItem(key:string, val:any):boolean {
            if(this._isLS) {
                localStorage.setItem(key, val);
                return true;
            } else {
                this._map[key] = val;
                return true;
            }
        }

        /**
         * 
         * @param key 
         */
        public getItem(key:string):any {
            if(this._isLS) {
                return localStorage.getItem(key) || null;
            } else {
                return this._map[key].val
            }
        }

        /**
         * 
         * @param key 
         */
        public removeItem(key:string):any {
            if(this._isLS) {
                let item = this.getItem(key);
                localStorage.removeItem(key);
                return item;
            } else {
                if(this.exists(key)) {
                    let item = this._map[key];
                    this._map[key] = null;
                    return item;
                } else {
                    return false;
                }
            }
            
        }

        /**
         * 
         * @param key 
         */
        public exists(key:string):boolean {
            if(this._isLS) {
                if (localStorage.getItem(key) === null) {
                    return false;
                } else {
                    return true;
                }
            } else {
                if(this._map[key]) {
                    return true;
                } else {
                    return false;
                }
            }
        }

        /**
         * 
         */
        public removeAll() {
            if(this._isLS) {
                localStorage.clear();
            } else {
                this._map = {};
            }
        }

        public length():number {
            if(this._isLS) {
                localStorage.length
            } else {
                return Object.keys(this._map).length;
            }
        }

        /**
         * @description Detects if local storage is avaialble in the browser
         * 
         * @returns {boolean}
         */
        public localStorageAvailable():boolean {
            var a = 'a';
            try {
                localStorage.setItem(a, a);
                localStorage.removeItem(a);
                return true;
            } catch(e) {
                return false;
            }
        }
    }
}