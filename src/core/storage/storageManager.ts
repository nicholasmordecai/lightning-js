/// <reference path="./../../reference.d.ts" />

namespace Lightning {

    export class StorageManager {

        private _isLS:boolean = false;
        private _map:{[key:string]:any};

        public setItem:Function = this.setItemFallback;
        public getItem:Function = this.getItemFallback;
        public removeItem:Function = this.removeItemFallback;
        public removeAll:Function;
        public exists:Function = this.existsFallback;
        public length:Function = this.lengthFallback;
    
        constructor() {
            this._map = {};
            if(this.localStorageAvailable()) {
                this._isLS = true;
                this.setItem = this.setItemLS;
                this.getItem = this.getItemLS;
                this.removeItem = this.removeItemLS;
                this.exists = this.existsLS;
                this.length = this.lengthLS;
            }
        }

        /**
         * 
         * @param key 
         * @param val 
         */
        private setItemLS(key:string, val:any):boolean {
            localStorage.setItem(key, val);
            return true;
        }

        /**
         * 
         * @param key 
         * @param val 
         */
        private setItemFallback(key:string, val:any):boolean {
            this._map[key] = val;
            return true;
        }

        /**
         * 
         * @param key 
         */
        private getItemLS(key:string):any {
            return localStorage.getItem(key) || null;
        }

        /**
         * 
         * @param key 
         */
        private getItemFallback(key:string):any {
            return this._map[key].val
        }

        /**
         * 
         * @param key 
         */
        private removeItemLS(key:string):boolean {
            localStorage.removeItem(key);
            return true;
        }

        /**
         * 
         * @param key 
         */
        private removeItemFallback(key:string):boolean {
            if(this.exists(key)) {
                this._map[key] = null;
                return true;
            } else {
                return false;
            }
        }

        /**
         * 
         * @param key 
         */
        private existsLS(key:string):boolean {
            if (localStorage.getItem(key) === null) {
                return false;
            } else {
                return true;
            }
        }

        /**
         * 
         * @param key 
         */
        private existsFallback(key:string):boolean {
            if(this._map[key]) {
                return true;
            } else {
                return false;
            }
        }

        /**
         * 
         */
        private lengthLS():number {
            var _lsTotal=0,_xLen,_x;for(_x in localStorage){_xLen= ((localStorage[_x].length + _x.length)* 2);_lsTotal+=_xLen; console.log(_x.substr(0,50)+" = "+ (_xLen/1024).toFixed(2)+" KB")};console.log("Total = " + (_lsTotal / 1024).toFixed(2) + " KB");
            return _lsTotal;
        }

        /**
         * 
         */
        private lengthFallback():number {
            return Object.keys(this._map).length;
        }

        /**
         * 
         */
        private localStorageAvailable() {
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