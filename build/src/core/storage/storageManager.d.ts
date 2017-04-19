/// <reference path="../../../../src/reference.d.ts" />
declare namespace Lightning {
    class StorageManager {
        private _isLS;
        private _map;
        setItem: Function;
        getItem: Function;
        removeItem: Function;
        removeAll: Function;
        exists: Function;
        length: Function;
        constructor();
        /**
         *
         * @param key
         * @param val
         */
        private setItemLS(key, val);
        /**
         *
         * @param key
         * @param val
         */
        private setItemFallback(key, val);
        /**
         *
         * @param key
         */
        private getItemLS(key);
        /**
         *
         * @param key
         */
        private getItemFallback(key);
        /**
         *
         * @param key
         */
        private removeItemLS(key);
        /**
         *
         * @param key
         */
        private removeItemFallback(key);
        /**
         *
         * @param key
         */
        private existsLS(key);
        /**
         *
         * @param key
         */
        private existsFallback(key);
        /**
         *
         */
        private lengthLS();
        /**
         *
         */
        private lengthFallback();
        /**
         *
         */
        private localStorageAvailable();
    }
}
