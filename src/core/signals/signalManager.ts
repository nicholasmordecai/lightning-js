/// <reference path="./../../reference.d.ts" />

namespace Lightening.Signals {
    /**
     * Signal Manager class for storing, manipulating and general management of signals throughout the game
     */

    export class SignalManager {

        private game:Engine;
        private _signals:{[name:string]:Signal};
        /**
         * signal manager constructor
         * @param game
         */

        constructor(game:Engine) {
            this.game = game;
            this._signals = {};
        }

        getInsatance() {
            
        }

        /**
         * create a new signal
         * @param str
         * @returns {any}
         */
        create(str:string) {
            try {
                this._signals[str] = new Signal();
                return this._signals[str];
            }
            catch(e) {
                console.error(e.message);
                return null;
            }
        }

        /**
         * add a function to the signal to fire on dispatch
         * @param str
         * @param fnct
         * @param listenerContext? = null
         */
        add(str:string, fnct:Function, listenerContext:any = null) {
            try {
                let s = this.signal(str);
                this.signal(str).add(fnct,listenerContext);
            }
            catch(e) {
                console.error(e.message);
            }
        }

        /**
         * add a function to the signal to fire only once on dispatch, then automatically destroy the function
         * @param str
         * @param fnct
         */
        addOnce(str:string, fnct:Function) {
            try {
                this.signal(str).addOnce(fnct);
            }
            catch(e) {
                console.error(e.message);
            }
        }

        /**
         * destroy the entire signal
         * @param str
         */
        destroy(str:string) {
            try {
                let s = this.signal(str);
                s = null;
            }
            catch(e) {
                console.error(e.message);
            }
        }

        /**
         * set the state of the signal (active, inactive)
         * @param str
         * @param val
         */
        active(str:string, val:boolean) {
            try {
                this.signal(str).active = val;
            }
            catch(e) {
                console.error(e.message);
            }
        }

        /**
         * dispatch a signal with all the parameters
         * @param str
         * @param params
         */
        dispatch(str:string, ... params) {
            try {
                this.signal(str).dispatch(params);
            }
            catch(e) {
                console.error(e.message);
            }
        }

        /**
         * return a signal
         * @param str
         * @returns {any}
         */
        signal(str:string) {
            for(let i in this._signals) {
                if(i === str) {
                    return this._signals[i];
                }
            }
            console.error('No signal exists with the key "' + str + '"');
        }

        /**
         * check if signal is already created
         * @param name
         * @return boolean
         */
        has(name:string):boolean{
            return this._signals[name] !== undefined;
        }
    }
}
