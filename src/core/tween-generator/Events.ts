/// <reference path="./Interfaces/Callback.ts" />

namespace Tween {
    export class Events {

    private tween:Tween;
    private _events:Callback[];

    /**
     * Construct a new event class
     * @param {Object} tween
     */
    constructor(tween:Tween) {
        this.tween = tween;
        this._events = new Array();
    }

    /**
     * Add a new event
     * @param  {string} name
     * @param  {Function} funct
     */
    add(funct:Function, functContext:any = null, ... functParams) {
        let event = <Callback>{};
        event.funct = funct;
        event.frame = null;
        event.functContext = functContext;
        event.functParams = functParams;
        event.once = false;

        this._events.push(event);
    }
    
    /**
     * Add an event that gets destroyed on use
     * @param  {string} name
     * @param  {Function} funct
     */
    addOnce(funct:Function, functContext:any = null, ... functParams) {
        let event = <Callback> {};
        event.funct = funct;
        event.functContext = functContext;
        event.functParams = functParams;
        event.frame = null;
        event.once = true;

        this._events.push(event);
    }

    addAtFrame(funct:Function, frame:number, functContext:any = null, ... functParams) {
        let event = <Callback> {};
        event.funct = funct;
        event.functContext = functContext;
        event.functParams = functParams;
        event.frame = frame;
        event.once = false;

        this._events.push(event);
    }

    addOnceAtFrame(funct:Function, frame:number, functContext:any = null, ... functParams) {
        let event = <Callback> {};
        event.funct = funct;
        event.functContext = functContext;
        event.functParams = functParams;
        event.frame = frame;
        event.once = true;

        this._events.push(event);
    }

    /**
     * When the event is triggered, fire all the functions in the events array
     */
    trigger() {
        for(let i = 0; i < this._events.length; i++) {
            let event = this._events[i];
            (event.funct as Function).apply(event.functContext, event.functParams);

            // if event is flagged as a once only
            // remove it from the events array
            if(event.once) {
                this._events.splice(i, 1);
            }
        }
    }

    /**
     * Removes an event from the array - finds the position using the findPosition function
     * @param  {string} name
     */
    remove(name:string) {
        let position = this.findPosition(name);
        if(position !== -1) {
            this._events.splice(position, 1);
        }
    }

    exists(frame:number):any {
        for(let i of this._events) {
            if(i.frame === frame) {
                return i;
            }
        }
        return false;
    }
    
    /**
     * Re-instanciates the events array, destroying all events
     */
    removeAll() {
        this._events = new Array();
    }

    /**
     * Returns an event instance
     * @param  {string} ref
     */
    find(ref:string):any {
        for(let i of this._events) {
            if(i.name === ref) {
                return i;
            }
        }
        return false;
    }

    /**
     * Returns the position of an event
     * @param  {string} ref
     */
    findPosition(ref:string):number {
        for(let i in this._events) {
            if(this._events[i].name === ref) {
                return parseInt(i);
            }
        }
        return -1;
    }
}
} 