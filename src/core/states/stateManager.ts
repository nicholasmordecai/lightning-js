/// <reference path="./../../reference.d.ts" />

/**
 * TODO
 * 1. State by state FPS (for performance)
 */

namespace Lightning {
    export class StateManager {

        protected game:Engine;
        protected _states:Array<iStateMap>;
        protected _activeStates:Array<State>;

        /**
         * @description StateManager constructor
         * 
         * @param {Engine} game
         */
        constructor(game:Engine) {
            this.game = game;
            this._states = [];
            this._activeStates = [];
        }

        /**
         * @description Update loop. Called from the game ticker and is used to call each state update function individually
         */
        update() {
            for(let state of this._activeStates) {
                state.update();
            }
        }

        /**
         * @description Initalize a single state. Usually called from the start function, though this can be bypassed and a custom state injected via this function
         * 
         * @param {State} state
         * @param {Array} params
         * 
         * @returns {boolean}
         */
        init(state:State, ...params):boolean {
            state.init(params);
            this.addToActive(state);
            return true;
        }

        /**
         * @description Start a state. This function is called in order to add a state to the world display list and call the init function if the state is to auto initalize
         */
        start(key, autoInit:boolean = true, ...params) {
            let map = this.findState(key);
            this.game.world.addChild(map.state);
            map.worldIndex = this.game.world.getChildIndex(map.state);
            if(autoInit) {
                this.init(map.state, params);
            }
        }

        /**
         * @description Leaves the state renderable and interactive but disables it's update procedure
         *
         * @param {string} key
         * 
         * @returns {boolean}
         */
        pause(key:string):boolean {
            let state = this.findState(key).state;
            this._activeStates.splice(this.findActiveIndex(state));
            return true;
        }

        /**
         * @description Re-enabled the state's update procedure
         *
         * @param {string} key
         * 
         * @returns {boolean}
         */
        unpause(key:string):boolean {
            let state = this.findState(key).state;
            this.addToActive(state);
            return true;
        }

        /**
         * TODO
         * @description Will reset the state by nullifying it and calling the constructor to re-initalize it
         */
        reset() {
            // let state = this.findState('').state;
            // let newState = state.constructor();

        }

        /**
         * @description Will remove the state from the render list and update loop. It will also set all 
         * interactivity to false as well as visibility and renderable.
         * Will store it's current position in the display list incase it is to be re-enabled at the same position
         * 
         * @returns {boolean}
         */
        disable(key:string):boolean {
            let map = this.findState(key);
            let state = map.state;
            
            // store the world index
            map.worldIndex = this.game.world.getChildIndex(map.state);

            // disable properties
            state.interactive = false;
            state.interactiveChildren = false;
            state.visible = false;
            state.renderable = false;
            // remove from the display list
            this.game.world.removeChild(state);

            // get index from array and splice
            this._activeStates.splice(this.findActiveIndex(state));

            return true;
        }

        /** 
         * @description Will re-enable a state exactly as it was before being disabled. 
         * Sets all visibility, interactivity and renderable to true. 
         * If last index is passed, it will use the previous position in the world display list
         * If the index is passed, it will be added to the world display list where the index is
         * If last index is false and index is null, then it will get added to the top of the world display list
         * 
         * @returns {boolean}
         */
        enable(key:string, lastIndex:boolean = true, index:number = null):boolean {
            let map = this.findState(key);
            let state:State = map.state;
            state.visible = true;
            state.renderable = true;
            state.interactive = true;
            state.interactiveChildren = true;
            if(lastIndex === true) {
                this.game.world.addChildAt(state, map.worldIndex);
            } else if (index !== null){
                this.game.world.addChildAt(state, index);
            } else {
                this.game.world.addChild(state);
            }

            return true;
        }

        /**
         * @description Destroy the state entirley
         * Removes from the world children
         * Removes from the active states array
         * sets visible, renderable and all interactivity to false
         * 
         * @param {string} key
         * 
         * @returns {boolean}
         */
        destroy(key:string):boolean {
            // get the state
            let state = this.findState(key).state;

            // disable properties
            state.visible = false;
            state.renderable = false;
            state.interactive = false;
            state.interactiveChildren = false;

            // remove from the game world
            this.game.world.removeChild(state);
            
            // get index from array and splice
            this._activeStates.splice(this.findActiveIndex(state));

            // finally, nullify so GC can free up space
            state = null;

            return true;
        }

        /**
         * @description Adds a new state to the state StateManager
         * 
         * @param {string} key
         * @param {State} state
         * 
         * @returns {boolean}
         */
        add(key:string, state:State):boolean {
            let newMap:iStateMap = <iStateMap>{};
            newMap.key = key;
            newMap.state = state;
            newMap.active = false;
            newMap.worldIndex = null;
            newMap.fps = 60;
            this._states.push(newMap);
            return true;
        }
        
        /**
         * @description Adds a state to the active states array if it's not already there
         * 
         * @param {State} state
         * 
         * @returns {boolean}
         */
        private addToActive(state:State):boolean {
            let exists:boolean = false
            for(let i of this._activeStates) {
                if(i === state) {
                    exists = true;
                }
            }

            if(!exists) {
                this._activeStates.push(state);
                return true;
            } else {
                return false;
            }
        }

        /**
         * TODO
         * @description Will create a texture of the state as it currently is and apply it to the state as it's only renderable child. This could be used when large state transitions are happening and the display list gets too large and effects performance
         */
        freeze() {

        }

        remove(key:string) {

        }

        /**
         * @description Loop through the states array and match by key. If one is found, then the entire state map is returned
         * 
         * @param {string} key
         * 
         * @returns {State}
         */
        findState(key:string):iStateMap {
            for(let i of this._states) {
                if(i.key === key) {
                    return i;
                }
            }
            return null;
        }

        /**
         * @description Loops through all active states and matches by a state
         * 
         * @param {state} 
         * 
         * @returns {number}
         */
        findActiveIndex(state:State):number {
            let count:number = 0;
            for(let i of this._activeStates) {
                if(i === state) {
                    return count;
                }
                count++;
            }
            return null;
        }
    }
}