/// <reference path="../../../../src/reference.d.ts" />
declare namespace Lightning {
    class StateManager {
        protected game: Engine;
        protected _states: Array<iStateMap>;
        protected _activeStates: Array<State>;
        /**
         * @description StateManager constructor
         *
         * @param {Engine} game
         */
        constructor(game: Engine);
        /**
         * @description Update loop. Called from the game ticker and is used to call each state update function individually
         */
        update(time: number): void;
        /**
         * @description Initalize a single state. Usually called from the start function, though this can be bypassed and a custom state injected via this function
         *
         * @param {State} state
         * @param {Array} params
         *
         * @returns {boolean}
         */
        init(state: State, ...params: any[]): boolean;
        /**
         * @description Start a state. This function is called in order to add a state to the world display list and call the init function if the state is to auto initalize
         */
        start(key: any, autoInit?: boolean, ...params: any[]): void;
        /**
         * @description Leaves the state renderable and interactive but disables it's update procedure
         *
         * @param {string} key
         *
         * @returns {boolean}
         */
        pause(key: string): boolean;
        /**
         * @description Re-enabled the state's update procedure
         *
         * @param {string} key
         *
         * @returns {boolean}
         */
        unpause(key: string): boolean;
        /**
         * TODO
         * @description Will reset the state by nullifying it and calling the constructor to re-initalize it
         */
        reset(): void;
        /**
         * @description Will remove the state from the render list and update loop. It will also set all
         * interactivity to false as well as visibility and renderable.
         * Will store it's current position in the display list incase it is to be re-enabled at the same position
         *
         * @returns {boolean}
         */
        disable(key: string): boolean;
        /**
         * @description Will re-enable a state exactly as it was before being disabled.
         * Sets all visibility, interactivity and renderable to true.
         * If last index is passed, it will use the previous position in the world display list
         * If the index is passed, it will be added to the world display list where the index is
         * If last index is false and index is null, then it will get added to the top of the world display list
         *
         * @returns {boolean}
         */
        enable(key: string, lastIndex?: boolean, index?: number): boolean;
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
        destroy(key: string): boolean;
        /**
         * @description Adds a new state to the state StateManager
         *
         * @param {string} key
         * @param {State} state
         *
         * @returns {boolean}
         */
        add(key: string, state: State): boolean;
        /**
         * @description Adds a state to the active states array if it's not already there
         *
         * @param {State} state
         *
         * @returns {boolean}
         */
        private addToActive(state);
        /**
         * TODO
         * @description Will create a texture of the state as it currently is and apply it to the state as it's only renderable child. This could be used when large state transitions are happening and the display list gets too large and effects performance
         */
        freeze(): void;
        /**
         * @description Loop through the states array and match by key. If one is found, then the entire state map is returned
         *
         * @param {string} key
         *
         * @returns {State}
         */
        findState(key: string): iStateMap;
        /**
         * @description Loops through all active states and matches by a state
         *
         * @param {state}
         *
         * @returns {number}
         */
        findActiveIndex(state: State): number;
    }
}
