/// <reference path="Interfaces/Callback.d.ts" />
declare namespace Tween {
    class Events {
        private tween;
        private _events;
        /**
         * Construct a new event class
         * @param {Object} tween
         */
        constructor(tween: Tween);
        /**
         * Add a new event
         * @param  {string} name
         * @param  {Function} funct
         */
        add(funct: Function, functContext?: any, ...functParams: any[]): void;
        /**
         * Add an event that gets destroyed on use
         * @param  {string} name
         * @param  {Function} funct
         */
        addOnce(funct: Function, functContext?: any, ...functParams: any[]): void;
        addAtFrame(funct: Function, frame: number, functContext?: any, ...functParams: any[]): void;
        addOnceAtFrame(funct: Function, frame: number, functContext?: any, ...functParams: any[]): void;
        /**
         * When the event is triggered, fire all the functions in the events array
         */
        trigger(): void;
        /**
         * Removes an event from the array - finds the position using the findPosition function
         * @param  {string} name
         */
        remove(name: string): void;
        exists(frame: number): any;
        /**
         * Re-instanciates the events array, destroying all events
         */
        removeAll(): void;
        /**
         * Returns an event instance
         * @param  {string} ref
         */
        find(ref: string): any;
        /**
         * Returns the position of an event
         * @param  {string} ref
         */
        findPosition(ref: string): number;
    }
}
