/// <reference path="./../../reference.d.ts" />

/**
 * TODO
 * 
 * Refactor arrays of states and active states for dictionary definition objects
 * Implement freeze state feature
 * Possibly refactor the state destroy method (cycle through and also destroy all physics bodies associated with that state)
 * Reset / Restart the state
 * Easy to use prepare function, to create a state, but not allow it to be rendered until ready
 */

namespace Lightning {
    export class StateManager extends Plugin {

        protected game:Engine;
        protected _states:Array<iStateMap>;
        protected _activeStates:Array<iStateMap>;

        private _verbose:boolean;

        /**
         * @description StateManager constructor
         * 
         * @param {Engine} game
         */
        constructor(game:Engine) {
            super(game);
            this.game = game;
            this._states = [];
            this._activeStates = [];
            this._verbose = false;
        }

        /**
         * @description Update loop. Called from the game ticker and is used to call each state update function individually
         */
        protected update(time:number) {
            for(let map of this._activeStates) {
                map.state.update(time);
            }
        }

        /**
         * @description Start a state. This function is called in order to add a state to the world display list and call the init function if the state is to auto initalize
         */
        public start(key, destroyCurrentStates:boolean = true, autoInit:boolean = true, ...params) {
            if(this._verbose) console.info('StateManager - Start State: "' + key + '"');

            if(destroyCurrentStates) {
                for(let map of this._activeStates) {
                    // ignore destroying the state being started if it's already active
                    if(map.key !== key) {
                        this.destroy(map.key);
                    }   
                }
            }

            let map = this.findState(key);
            let state:State = map.state;
            this.game.world.addChild(state);
            
            state.visible = true;
            state.renderable = true;
            state.interactive = true;
            state.interactiveChildren = true;


            if(autoInit) {
                this.init(map, params);
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
        public init(map:iStateMap, ...params):void {
            if(this._verbose) console.info('StateManager - Initalising State: "' + map.key + '"');
            let state = map.state;
            state.construct(this.game)
            this.addToActive(map);
            state.init(params);
        }

        /**
         * @description Leaves the state renderable and interactive but disables it's update procedure
         *
         * @param {string} key
         * 
         * @returns {boolean}
         */
        public pause(key:string):boolean {
            let state = this.findState(key);
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
        public unpause(key:string):boolean {
            let state = this.findState(key);
            this.addToActive(state);
            return true;
        }

        /**
         * TODO
         * @description Will reset the state by nullifying it and calling the constructor to re-initalize it
         */
        public reset() {
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
        public disable(key:string):boolean {
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
            this._activeStates.splice(this.findActiveIndex(map));

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
        public enable(key:string, lastIndex:boolean = true, index:number = null):boolean {
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
        public destroy(key:string):boolean {
            if(this._verbose) console.info('StateManeger - Destroying State: "' + key + '"');
            // get the state
            let map = this.findState(key);
            let state = map.state;

            // get index from array and splice first, to stop any updates whilst the state is being destroyed
            map.active = false;
            this._activeStates.splice(this.findActiveIndex(map));

            // disable properties
            state.visible = false;
            state.renderable = false;
            state.interactive = false;
            state.interactiveChildren = false;

            // destroy stuff
            this.destroyAllChildren(state);

            /**
             * Should find a more robust way of doing this
             */
            // remove from the game world
            this.game.world.removeChild(state);
            

            /**
             * Give thoughts to how to better clean up a destroyed state
             */
            // finally, nullify so GC can free up space
            // state = null;

            return true;
        }

        private destroyAllChildren(rootObject:PIXI.Container) {
            for(let child of rootObject.children) {
                child.destroy();
            }
        }

        /**
         * @description Adds a new state to the state StateManager
         * 
         * @param {string} key
         * @param {State} state
         * 
         * @returns {boolean}
         */
        public add(key:string, state:State):boolean {
            if(this._verbose) console.info('StateManager - Adding New State: "' + key + '"');
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
        private addToActive(map:iStateMap):boolean {
            if(!this.isActive(map)) {
                this._activeStates.push(map);
                map.active = true;
                return true;
            } else {
                return false;
            }
        }

        private isActive(map:iStateMap):boolean {
            let exists:boolean = false
            for(let i of this._activeStates) {
                if(i.key === map.key) {
                    exists = true;
                }
            }
            return false;
        }

        /**
         * TODO
         * @description Will create a texture of the state as it currently is and apply it to the state as it's only renderable child. This could be used when large state transitions are happening and the display list gets too large and effects performance
         */
        public freeze() {

        }

        /**
         * @description Loop through the states array and match by key. If one is found, then the entire state map is returned
         * 
         * @param {string} key
         * 
         * @returns {State}
         */
        private findState(key:string):iStateMap {
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
        private findActiveIndex(map:iStateMap):number {
            let count:number = 0;
            for(let i of this._activeStates) {
                if(i.key === map.key) {
                    return count;
                }
                count++;
            }
            return null;
        }

        public set verbose(val:boolean) {
            this._verbose = val;
        }

        public get verbose():boolean {
            return this._verbose;
        }
    }
}