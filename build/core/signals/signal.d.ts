/// <reference path="../../../src/reference.d.ts" />
declare namespace Lightning.Signals {
    /**
     *	@desc       A TypeScript conversion of JS Signals by Miller Medeiros
    *               Released under the MIT license
    *				http://millermedeiros.github.com/js-signals/
    *
    *	@version	1.0 - 7th March 2013
    *
    *	@author 	Richard Davey, TypeScript conversion
    *	@author		Miller Medeiros, JS Signals
    *	@author		Robert Penner, AS Signals
    *
    *	@url		http://www.photonstorm.com
    */
    /**
     * Custom event broadcaster
     * <br />- inspired by Robert Penner's AS3 Signals.
     * @name Signal
     * @author Miller Medeiros
     * @constructor
     */
    class Signal {
        /**
         * @property _bindings
         * @type Array
         * @private
         */
        private _bindings;
        /**
         * @property _prevParams
         * @type Any
         * @private
         */
        private _prevParams;
        /**
         * Signals Version Number
         * @property VERSION
         * @type String
         * @const
         */
        static VERSION: string;
        /**
         * If Signal should keep record of previously dispatched parameters and
         * automatically execute listener during `add()`/`addOnce()` if Signal was
         * already dispatched before.
         * @type boolean
         */
        memorize: boolean;
        /**
         * @type boolean
         * @private
         */
        private _shouldPropagate;
        /**
         * If Signal is active and should broadcast events.
         * <p><strong>IMPORTANT:</strong> Setting this property during a dispatch will only affect the next dispatch, if you want to stop the propagation of a signal use `halt()` instead.</p>
         * @type boolean
         */
        active: boolean;
        /**
         * @method validateListener
         * @param {Any} listener
         * @param {Any} fnName
         */
        validateListener(listener: any, fnName: any): void;
        /**
         * @param {Function} listener
         * @param {boolean} isOnce
         * @param {Object} [listenerContext]
         * @param {Number} [priority]
         * @return {SignalBinding}
         * @private
         */
        private _registerListener(listener, isOnce, listenerContext, priority);
        /**
         * @method _addBinding
         * @param {SignalBinding} binding
         * @private
         */
        private _addBinding(binding);
        /**
         * @method _indexOfListener
         * @param {Function} listener
         * @return {number}
         * @private
         */
        private _indexOfListener(listener, context);
        /**
         * Check if listener was attached to Signal.
         * @param {Function} listener
         * @param {Object} [context]
         * @return {boolean} if Signal has the specified listener.
         */
        has(listener: any, context?: any): boolean;
        /**
         * Add a listener to the signal.
         * @param {Function} listener Signal handler function.
         * @param {Object} [listenerContext] Context on which listener will be executed (object that should represent the `this` variable inside listener function).
         * @param {Number} [priority] The priority level of the event listener. Listeners with higher priority will be executed before listeners with lower priority. Listeners with same priority level will be executed at the same order as they were added. (default = 0)
         * @return {SignalBinding} An Object representing the binding between the Signal and listener.
         */
        add(listener: any, listenerContext?: any, priority?: number): SignalBinding;
        /**
         * Add listener to the signal that should be removed after first execution (will be executed only once).
         * @param {Function} listener Signal handler function.
         * @param {Object} [listenerContext] Context on which listener will be executed (object that should represent the `this` variable inside listener function).
         * @param {Number} [priority] The priority level of the event listener. Listeners with higher priority will be executed before listeners with lower priority. Listeners with same priority level will be executed at the same order as they were added. (default = 0)
         * @return {SignalBinding} An Object representing the binding between the Signal and listener.
         */
        addOnce(listener: any, listenerContext?: any, priority?: number): SignalBinding;
        /**
         * Remove a single listener from the dispatch queue.
         * @param {Function} listener Handler function that should be removed.
         * @param {Object} [context] Execution context (since you can add the same handler multiple times if executing in a different context).
         * @return {Function} Listener handler function.
         */
        remove(listener: any, context?: any): any;
        /**
         * Remove all listeners from the Signal.
         */
        removeAll(): void;
        /**
         * @return {number} Number of listeners attached to the Signal.
         */
        getNumListeners(): number;
        /**
         * Stop propagation of the event, blocking the dispatch to next listeners on the queue.
         * <p><strong>IMPORTANT:</strong> should be called only during signal dispatch, calling it before/after dispatch won't affect signal broadcast.</p>
         * @see Signal.prototype.disable
         */
        halt(): void;
        /**
         * Dispatch/Broadcast Signal to all listeners added to the queue.
         * @param {...*} [params] Parameters that should be passed to each handler.
         */
        dispatch(...paramsArr: any[]): void;
        /**
         * Forget memorized arguments.
         * @see Signal.memorize
         */
        forget(): void;
        /**
         * Remove all bindings from signal and destroy any reference to external objects (destroy Signal object).
         * <p><strong>IMPORTANT:</strong> calling any method on the signal instance after calling dispose will throw errors.</p>
         */
        dispose(): void;
        /**
         * @return {string} String representation of the object.
         */
        toString(): string;
    }
}
