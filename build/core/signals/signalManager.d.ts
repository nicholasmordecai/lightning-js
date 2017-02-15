/// <reference path="../../../src/reference.d.ts" />
declare namespace Lightning.Signals {
    /**
     * Signal Manager class for storing, manipulating and general management of signals throughout the game
     */
    class SignalManager {
        private game;
        private _signals;
        /**
         * signal manager constructor
         * @param game
         */
        constructor(game: Engine);
        getInsatance(): void;
        /**
         * create a new signal
         * @param str
         * @returns {any}
         */
        create(str: string): Signal;
        /**
         * add a function to the signal to fire on dispatch
         * @param str
         * @param fnct
         * @param listenerContext? = null
         */
        add(str: string, fnct: Function, listenerContext?: any): void;
        /**
         * add a function to the signal to fire only once on dispatch, then automatically destroy the function
         * @param str
         * @param fnct
         */
        addOnce(str: string, fnct: Function): void;
        /**
         * destroy the entire signal
         * @param str
         */
        destroy(str: string): void;
        /**
         * set the state of the signal (active, inactive)
         * @param str
         * @param val
         */
        active(str: string, val: boolean): void;
        /**
         * dispatch a signal with all the parameters
         * @param str
         * @param params
         */
        dispatch(str: string, ...params: any[]): void;
        /**
         * return a signal
         * @param str
         * @returns {any}
         */
        signal(str: string): Signal;
        /**
         * check if signal is already created
         * @param name
         * @return boolean
         */
        has(name: string): boolean;
    }
}
