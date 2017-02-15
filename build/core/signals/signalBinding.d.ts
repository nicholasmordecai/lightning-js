/// <reference path="../../../src/reference.d.ts" />
declare namespace Lightning.Signals {
    class SignalBinding {
        /**
         * Object that represents a binding between a Signal and a listener function.
         * <br />- <strong>This is an internal constructor and shouldn't be called by regular users.</strong>
         * <br />- inspired by Joa Ebert AS3 SignalBinding and Robert Penner's Slot classes.
         * @author Miller Medeiros
         * @constructor
         * @internal
         * @name SignalBinding
         * @param {Signal} signal Reference to Signal object tha
         * listener is currently bound to.
         * @param {Function} listener Handler function bound to the signal.
         * @param {boolean} isOnce If binding should be executed just once.
         * @param {Object} [listenerContext] Context on which listener will be executed (object that should represent the `this` variable inside listener function).
         * @param {Number} [priority] The priority level of the event listener. (default = 0).
         */
        constructor(signal: Signal, listener: any, isOnce: boolean, listenerContext: any, priority?: number);
        /**
         * Handler function bound to the signal.
         * @type Function
         * @private
         */
        private _listener;
        /**
         * If binding should be executed just once.
         * @type boolean
         * @private
         */
        private _isOnce;
        /**
         * Context on which listener will be executed (object that should represent the `this` variable inside listener function).
         * @memberOf SignalBinding.prototype
         * @name context
         * @type Object|undefined|null
         */
        context: any;
        /**
         * Reference to Signal object that listener is currently bound to.
         * @type Signal
         * @private
         */
        private _signal;
        /**
         * Listener priority
         * @type Number
         */
        priority: number;
        /**
         * If binding is active and should be executed.
         * @type boolean
         */
        active: boolean;
        /**
         * Default parameters passed to listener during `Signal.dispatch` and `SignalBinding.execute`. (curried parameters)
         * @type Array|null
         */
        params: any;
        /**
         * Call listener passing arbitrary parameters.
         * <p>If binding was added using `Signal.addOnce()` it will be automatically removed from signal dispatch queue, this method is used internally for the signal dispatch.</p>
         * @param {Array} [paramsArr] Array of parameters that should be passed to the listener
         * @return {*} Value returned by the listener.
         */
        execute(paramsArr?: any[]): any;
        /**
         * Detach binding from signal.
         * - alias to: mySignal.remove(myBinding.getListener());
         * @return {Function|null} Handler function bound to the signal or `null` if binding was previously detached.
         */
        detach(): any;
        /**
         * @return {Boolean} `true` if binding is still bound to the signal and have a listener.
         */
        isBound(): boolean;
        /**
         * @return {boolean} If SignalBinding will only be executed once.
         */
        isOnce(): boolean;
        /**
         * @return {Function} Handler function bound to the signal.
         */
        getListener(): any;
        /**
         * @return {Signal} Signal that listener is currently bound to.
         */
        getSignal(): Signal;
        /**
         * Delete instance properties
         * @private
         */
        _destroy(): void;
        /**
         * @return {string} String representation of the object.
         */
        toString(): string;
    }
}
