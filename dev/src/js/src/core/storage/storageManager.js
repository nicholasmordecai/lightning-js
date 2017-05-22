/// <reference path="./../../reference.d.ts" />
var Lightning;
(function (Lightning) {
    var StorageManager = (function () {
        function StorageManager(forceNoLocalStorage) {
            if (forceNoLocalStorage === void 0) { forceNoLocalStorage = false; }
            this._isLS = false;
            this._map = {};
            this._forceNoLocalStorage = false;
            if (this.localStorageAvailable()) {
                this._isLS = true;
            }
        }
        /**
         *
         * @param key
         * @param val
         */
        StorageManager.prototype.setItem = function (key, val) {
            if (this._isLS) {
                localStorage.setItem(key, val);
                return true;
            }
            else {
                this._map[key] = val;
                return true;
            }
        };
        /**
         *
         * @param key
         */
        StorageManager.prototype.getItem = function (key) {
            if (this._isLS) {
                return localStorage.getItem(key) || null;
            }
            else {
                return this._map[key].val;
            }
        };
        /**
         *
         * @param key
         */
        StorageManager.prototype.removeItem = function (key) {
            if (this._isLS) {
                var item = this.getItem(key);
                localStorage.removeItem(key);
                return item;
            }
            else {
                if (this.exists(key)) {
                    var item = this._map[key];
                    this._map[key] = null;
                    return item;
                }
                else {
                    return false;
                }
            }
        };
        /**
         *
         * @param key
         */
        StorageManager.prototype.exists = function (key) {
            if (this._isLS) {
                if (localStorage.getItem(key) === null) {
                    return false;
                }
                else {
                    return true;
                }
            }
            else {
                if (this._map[key]) {
                    return true;
                }
                else {
                    return false;
                }
            }
        };
        /**
         *
         */
        StorageManager.prototype.removeAll = function () {
            if (this._isLS) {
                localStorage.clear();
            }
            else {
                this._map = {};
            }
        };
        StorageManager.prototype.length = function () {
            if (this._isLS) {
                localStorage.length;
            }
            else {
                return Object.keys(this._map).length;
            }
        };
        /**
         * @description Detects if local storage is avaialble in the browser
         *
         * @returns {boolean}
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
        Object.defineProperty(StorageManager.prototype, "forceNoLocalStorage", {
            get: function () {
                return this._forceNoLocalStorage;
            },
            set: function (val) {
                this._forceNoLocalStorage = val;
            },
            enumerable: true,
            configurable: true
        });
        return StorageManager;
    }());
    Lightning.StorageManager = StorageManager;
})(Lightning || (Lightning = {}));
