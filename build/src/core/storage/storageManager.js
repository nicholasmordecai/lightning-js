/// <reference path="./../../reference.d.ts" />
var Lightning;
(function (Lightning) {
    var StorageManager = (function () {
        function StorageManager() {
            this._isLS = false;
            this.setItem = this.setItemFallback;
            this.getItem = this.getItemFallback;
            this.removeItem = this.removeItemFallback;
            this.exists = this.existsFallback;
            this.length = this.lengthFallback;
            this._map = {};
            if (this.localStorageAvailable()) {
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
        StorageManager.prototype.setItemLS = function (key, val) {
            localStorage.setItem(key, val);
            return true;
        };
        /**
         *
         * @param key
         * @param val
         */
        StorageManager.prototype.setItemFallback = function (key, val) {
            this._map[key] = val;
            return true;
        };
        /**
         *
         * @param key
         */
        StorageManager.prototype.getItemLS = function (key) {
            return localStorage.getItem(key) || null;
        };
        /**
         *
         * @param key
         */
        StorageManager.prototype.getItemFallback = function (key) {
            return this._map[key].val;
        };
        /**
         *
         * @param key
         */
        StorageManager.prototype.removeItemLS = function (key) {
            localStorage.removeItem(key);
            return true;
        };
        /**
         *
         * @param key
         */
        StorageManager.prototype.removeItemFallback = function (key) {
            if (this.exists(key)) {
                this._map[key] = null;
                return true;
            }
            else {
                return false;
            }
        };
        /**
         *
         * @param key
         */
        StorageManager.prototype.existsLS = function (key) {
            if (localStorage.getItem(key) === null) {
                return false;
            }
            else {
                return true;
            }
        };
        /**
         *
         * @param key
         */
        StorageManager.prototype.existsFallback = function (key) {
            if (this._map[key]) {
                return true;
            }
            else {
                return false;
            }
        };
        /**
         *
         */
        StorageManager.prototype.lengthLS = function () {
            var _lsTotal = 0, _xLen, _x;
            for (_x in localStorage) {
                _xLen = ((localStorage[_x].length + _x.length) * 2);
                _lsTotal += _xLen;
                console.log(_x.substr(0, 50) + " = " + (_xLen / 1024).toFixed(2) + " KB");
            }
            ;
            console.log("Total = " + (_lsTotal / 1024).toFixed(2) + " KB");
            return _lsTotal;
        };
        /**
         *
         */
        StorageManager.prototype.lengthFallback = function () {
            return Object.keys(this._map).length;
        };
        /**
         *
         */
        StorageManager.prototype.localStorageAvailable = function () {
            var a = 'a';
            try {
                localStorage.setItem(a, a);
                localStorage.removeItem(a);
                return true;
            }
            catch (e) {
                return false;
            }
        };
        return StorageManager;
    }());
    Lightning.StorageManager = StorageManager;
})(Lightning || (Lightning = {}));
//# sourceMappingURL=storageManager.js.map