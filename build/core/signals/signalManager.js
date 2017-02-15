/// <reference path="./../../reference.d.ts" />
var Lightning;
(function (Lightning) {
    var Signals;
    (function (Signals) {
        /**
         * Signal Manager class for storing, manipulating and general management of signals throughout the game
         */
        var SignalManager = (function () {
            /**
             * signal manager constructor
             * @param game
             */
            function SignalManager(game) {
                this.game = game;
                this._signals = {};
            }
            SignalManager.prototype.getInsatance = function () {
            };
            /**
             * create a new signal
             * @param str
             * @returns {any}
             */
            SignalManager.prototype.create = function (str) {
                try {
                    this._signals[str] = new Signals.Signal();
                    return this._signals[str];
                }
                catch (e) {
                    console.error(e.message);
                    return null;
                }
            };
            /**
             * add a function to the signal to fire on dispatch
             * @param str
             * @param fnct
             * @param listenerContext? = null
             */
            SignalManager.prototype.add = function (str, fnct, listenerContext) {
                if (listenerContext === void 0) { listenerContext = null; }
                try {
                    var s = this.signal(str);
                    this.signal(str).add(fnct, listenerContext);
                }
                catch (e) {
                    console.error(e.message);
                }
            };
            /**
             * add a function to the signal to fire only once on dispatch, then automatically destroy the function
             * @param str
             * @param fnct
             */
            SignalManager.prototype.addOnce = function (str, fnct) {
                try {
                    this.signal(str).addOnce(fnct);
                }
                catch (e) {
                    console.error(e.message);
                }
            };
            /**
             * destroy the entire signal
             * @param str
             */
            SignalManager.prototype.destroy = function (str) {
                try {
                    var s = this.signal(str);
                    s = null;
                }
                catch (e) {
                    console.error(e.message);
                }
            };
            /**
             * set the state of the signal (active, inactive)
             * @param str
             * @param val
             */
            SignalManager.prototype.active = function (str, val) {
                try {
                    this.signal(str).active = val;
                }
                catch (e) {
                    console.error(e.message);
                }
            };
            /**
             * dispatch a signal with all the parameters
             * @param str
             * @param params
             */
            SignalManager.prototype.dispatch = function (str) {
                var params = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    params[_i - 1] = arguments[_i];
                }
                try {
                    this.signal(str).dispatch(params);
                }
                catch (e) {
                    console.error(e.message);
                }
            };
            /**
             * return a signal
             * @param str
             * @returns {any}
             */
            SignalManager.prototype.signal = function (str) {
                for (var i in this._signals) {
                    if (i === str) {
                        return this._signals[i];
                    }
                }
                console.error('No signal exists with the key "' + str + '"');
            };
            /**
             * check if signal is already created
             * @param name
             * @return boolean
             */
            SignalManager.prototype.has = function (name) {
                return this._signals[name] !== undefined;
            };
            return SignalManager;
        }());
        Signals.SignalManager = SignalManager;
    })(Signals = Lightning.Signals || (Lightning.Signals = {}));
})(Lightning || (Lightning = {}));
//# sourceMappingURL=signalManager.js.map