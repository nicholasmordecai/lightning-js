/// <reference path="../../../src/reference.d.ts" />
declare namespace Tween {
    class TweenManager {
        private game;
        private _tweens;
        private _events;
        private _running;
        private _easing;
        constructor(game: any);
        /**
         * Makes a new instance of a tween
         * @param name
         * @returns {any}
         */
        newTween(name: string): any;
        /**
         * Create a new tween
         * @param name
         * @param property
         * @param from
         * @param to
         * @param time
         * @param easing
         */
        create(name: string, props: Array<any>): any;
        /**
         * Create an tween array with no tween data
         * @param name
         */
        createEmpty(name: string): any;
        /**
         * Calculate the frames in an tween
         * @param tween
         * @param property
         * @param from
         * @param to
         * @param time
         * @param easing
         */
        calculateFrames(tween: Tween, props: any): void;
        /**
         * Add a custom frame to the tween sequence
         * @param name
         * @param position
         * @param data
         */
        addFrame(name: string, position: number, data: Array<any>): void;
        /**
         * Combine 2 tween sequences together
         * @param name1
         * @param name2
         * @param position if -1 tween will chain at the end
         * @param destroyOriginals remove the original tweens after building the new one
         */
        extend(newName: string, tweens: Array<string>, position: number, destroyOriginals: boolean): any;
        /**
         * Start a tween. Keeps the original safe and clones the object
         * @param obj object to be tweened
         * @param name name of the tween
         * @param loop if loops are enabled
         * @param loops number of times to loop
         * @param autoDestroy if is to auto destroy
         */
        start(obj: Object, name: string, loop: boolean, loops: number, autoDestroy: boolean): {
            tween: any;
            obj: Object;
        };
        /**
         * Start a tween. Keeps the original safe and clones the object
         * @param obj object to be tweened
         * @param name name of the tween
         * @param loop if loops are enabled
         * @param loops number of times to loop
         * @param autoDestroy if is to auto destroy
         */
        startDirect(obj: Object, tween: Tween, loop: boolean, loops: number, autoDestroy: boolean): {
            tween: any;
            obj: Object;
        };
        /**
         * @param {string} name - Returns a deep cloned object of the requested tween
         */
        clone(name: string): any;
        /**
         * Clones a tween object
         */
        cloneObj(obj: any): any;
        /**
         * Clone object properties
         */
        copyObjectProps(objFrom: any, objTo: any): void;
        /**
         * Call the object constructor, or initalise a new one
         */
        cloneEmptyObject(o: any): any;
        /**
         * Check on the object type
         */
        isPlainObject(o: any): boolean;
        /**
         * Gets called every request frame update
         * If there are
         */
        update(): void;
        /**
         * @param {string} name
         * @param {boolean} cached
         */
        remove(name: string, cached?: boolean): void;
        /**
         * Return the tween by name
         * @param {string} name
         */
        getTween(name: string): any;
        /**
         * Shorter naming for retreiving a tween
         */
        find(name: string): Tween;
        /**
         * Provides access to Robert Penner's easing equations
         */
        readonly easing: Easing;
        /**
         * Give access to the events class
         */
        readonly events: Events;
    }
}
