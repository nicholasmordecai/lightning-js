/// <reference path="./../../reference.d.ts" />

namespace Lightning.Signals {
    /**
     * Signal Manager class for storing, manipulating and general management of signals throughout the game
     */

    export class SignalManager {

        private game:Engine;
        private _signals:{[name:string]:Signal};

        /**
         * @description Signal Manager constructor
         * 
         * @param {engine} game
         */
        constructor(game:Engine) {
            this.game = game;
            this._signals = {};
        }

        /**
         * @description Create a new signal
         * 
         * @param {string} key
         * 
         * @returns {Signal}
         */
        create(key:string):Signal {
            let signal = this._signals[key] = new Signal();
            return signal || null;
        }

        /**
         * @description Add a function to a signal
         * 
         * @param {string} key
         * @param {function} fn
         * @param {Object} listenerContext 
         * 
         * @returns {boolean}
         */
        add(key:string, fn:Function, listenerContext:Object = null):boolean {
            this.signal(key).add(fn, listenerContext);
            return true;
        }

        /**
         * @description Add a function to a signal only once
         * 
         * @param {string} key
         * @param {function} fn
         * @param {Object} listenerContext
         * 
         * @returns {boolean}
         */
        addOnce(key:string, fn:Function, listenerContext:Object):boolean {
            this.signal(key).addOnce(fn, listenerContext);
            return true;
        }

        /**
         * @description Destroy the signal
         * @param {string} key
         * 
         * @returns {boolean§}
         */
        destroy(key:string):boolean {
            let s = this.signal(key);
            s = null;
            return true;
        }

        /**
         * @description Change the active property on a signal
         * 
         * @param {string} key
         * @param {boolean} active
         * 
         * @returns {boolean}
         */
        active(key:string, active:boolean):boolean {
            try {
                this.signal(key).active = active;
            } catch(e) {
                return false;
            }
        }

        /**
         * @description dispatch a signal and pass parameters
         * 
         * @param {string} key
         * @param {Array} params
         */
        dispatch(key:string, ... params):boolean {
            try {
                this.signal(key).dispatch(params);
                return true;
            } catch(e) {
                return false;
            }
        }

        /**
         * @description Returns a signal if it exists, else it will return null
         * 
         * @param {srting} key
         * 
         * @returns {Signal}
         */
        signal(key:string):Signal {
            return this.signal(key) || null;
        }

        /**
         * @description Return true if the signal is created, else return false
         * 
         * @param {string} name
         * 
         * @return {boolean}
         */
        has(name:string):boolean{
            return this._signals[name] !== undefined;
        }
    }
}
