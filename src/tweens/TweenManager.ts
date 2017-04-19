/// <reference path="./../reference.d.ts" />

namespace Lightning {
    export class TweenManager {

        private game;
        private _tweens:Array<Tween>;
        private _events:Events;
        // need an interface for this!
        private _running:Array<any>;
        private _easing:Easing;

        constructor(game) {
            this.game = game;
            this._tweens = [];
            this._running = [];
            this._easing = new Easing();
        }

        /**
         * Makes a new instance of a tween
         * @param name
         * @returns {any}
         */
        newTween(name:string) {
            // -- TODO -- Need to change this._tweens[name] for this.find!
            // if tween name exists, throw error, else create blank tween data
            if(this._tweens[name]) {
                console.error('Tween with the name "' + name + '" already exists');
                return false;
            } else {
                this._tweens[name] = new Tween(this);
                return this._tweens[name];
            }
        }

        /**
         * Create a new tween
         * @param name
         * @param property
         * @param from
         * @param to
         * @param time
         * @param easing
         */
        create(name:string, props:Array<any>) {
            // if null is passed as a name, then don't give the tween a name or add it to the global array of tweens
            if(name == null) {
                let tween = new Tween(this);
                this.calculateFrames(tween, props);
                return tween;
            } else {
                // get a new instance of an tween
                let tween = this.newTween(name);
                this.calculateFrames(tween, props);
                return tween;
            }
        }

        /**
         * Create an tween array with no tween data
         * @param name
         */
        createEmpty(name:string) {
            if(name == null) { 
                let tween = new Tween(this);
                return tween;
            } else {
                let tween = this.newTween(name);
                return tween;
            }
        }

        /**
         * Calculate the frames in an tween
         * @param tween
         * @param property
         * @param from
         * @param to
         * @param time
         * @param easing
         */
        calculateFrames(tween:Tween, props) {
            // calculate the number of frames as ms / 1000 * desired tween fps;

            for(let t of props) {
                let numOfFrames = (t.time / 1000) * 60;

                for (let i = 0; i <= numOfFrames; i++) {
                    let val = t.easing(null, i, t.from, t.to - t.from, numOfFrames);
                    tween.createFrame(i, [{prop: t.prop, val:val}], false);
                }
            }
        }

        /**
         * Add a custom frame to the tween sequence
         * @param name
         * @param position
         * @param data
         */
        addFrame(name:string, position:number, data:Array<any>) {
            let tween = this.getTween(name);
        }

        /**
         * Combine 2 tween sequences together
         * @param name1
         * @param name2
         * @param position if -1 tween will chain at the end
         * @param destroyOriginals remove the original tweens after building the new one
         */
        extend(newName:string, tweens:Array<string>, position:number, destroyOriginals:boolean) {
            let tween = null;
            if(newName !== null) {
                tween = this.newTween(newName);
            } else {
                tween = new Tween(this);
            }
        
            // if tween creation failed, return
            if(tween instanceof Tween == false) { return };

            let globalFrameId = 0;

            for(let i = 0; i < tweens.length; i++) {
                // get single tween
                let tempTween = null;
                if(typeof(tweens[i]) == 'string') {
                    tempTween = this.getTween(tweens[i]);
                } else {
                    tempTween = tweens[i];
                }
                
                // if tween was not found, return false
                if(!tempTween) return false;
                for(let x = 0; x < tempTween.frames.length; x++) {
                    let frame = tempTween.frames[x];
                    tween.extendFrame(globalFrameId, frame.properties, frame.relative);
                }
            }
            return tween;
        }

        /**
         * Start a tween. Keeps the original safe and clones the object
         * @param obj object to be tweened
         * @param name name of the tween
         * @param loop if loops are enabled
         * @param loops number of times to loop
         * @param autoDestroy if is to auto destroy
         */
        start(obj:Object, name:string, loop:boolean, loops:number, autoDestroy:boolean) {
            // retrieve the tween
            let tween = this.getTween(name);
            // if this is not a valid tween, return
            if(tween instanceof Tween == false) { return };
            // if the tween is set to loop

            // deep clone the object to leave the original intact
            let curTween:any=Object.create(tween);

            if(loop) {
                curTween.loop = true;
                curTween.loopsRemaining = loops;
            }
            // set the auto destroy on completion
            curTween.autoDestroy = autoDestroy;

            // add the clone tween to the currently running array with the associated object
            let t = {
                tween: curTween,
                obj: obj
            };

            t.tween.onStartTrigger();
            
            this._running.push(t);
            return(t);
        }
        
        /**
         * Start a tween. Keeps the original safe and clones the object
         * @param obj object to be tweened
         * @param name name of the tween
         * @param loop if loops are enabled
         * @param loops number of times to loop
         * @param autoDestroy if is to auto destroy
         */
        startDirect(obj:Object, tween:Tween, loop:boolean, loops:number, autoDestroy:boolean) {

            // deep clone the object to leave the original intact
            let curTween:any=Object.create(tween);

            if(loop) {
                curTween.loop = true;
                curTween.loopsRemaining = loops;
            }
            // set the auto destroy on completion
            curTween.autoDestroy = autoDestroy;

            // add the clone tween to the currently running array with the associated object
            let t = {
                tween: curTween,
                obj: obj
            };

            t.tween.onStartTrigger();
            this._running.push(t);
            return t;
        }

        /**
         * @param {string} name - Returns a deep cloned object of the requested tween
         */
        clone(name:string) {
            // retrieve the tween
            let tween = this.getTween(name);
            // if this is not a valid tween, return
            if(tween instanceof Tween == false) { return };

            let clone = this.cloneObj(tween);
            
            return clone;
        }

        /**
         * Clones a tween object 
         */
        cloneObj(obj) {
            if(!obj || (typeof obj != "object")) return obj;

            let clone = this.cloneEmptyObject(obj);

            this.copyObjectProps(obj, clone);

            return clone;
        } 

        /**
         * Clone object properties
         */
        copyObjectProps (objFrom, objTo) {
            for (let i in objFrom) {
                if (!objFrom.hasOwnProperty(i)) continue;

                if (objFrom[i] instanceof Array) {
                    objTo[i] = [];
                    for (let n = 0; n < objFrom[i].length; n++) {
                        if (typeof objFrom[i][n] == "object" && objFrom[i][n] !== null) {
                            objTo[i][n] = this.cloneEmptyObject(objFrom[i][n]);
                            this.copyObjectProps(objFrom[i][n], objTo[i][n]);
                        } else {
                            objTo[i][n] = objFrom[i][n];
                        }
                    }
                    continue;
                }

                if (this.isPlainObject(objFrom[i])) {
                    objTo[i] = {};
                    this.copyObjectProps(objFrom[i], objTo[i]);
                    continue;
                }

                objTo[i] = objFrom[i];
            }
        }

        /**
         * Call the object constructor, or initalise a new one
         */
        cloneEmptyObject (o) {
            return o.constructor ? new o.constructor(): {};
        }

        /**
         * Check on the object type
         */
        isPlainObject (o) {
            if (!o || !o.constructor) return false;
            return o.constructor === Object;
        }

        /**
         * Gets called every request frame update
         * If there are
         */
        update() {
            // put check if paused. If the running array is empty, set bool to false
            // only set this to true when a new tween is started (sleep mode)
            for(let i in this._running) {

                // if tween is not paused
                let tween = this._running[i].tween;
                let obj = this._running[i].obj;

                if(!tween.isPaused) {
                    tween.applyUpdate(obj);
                } else {
                    if(tween.deleteFlag) {
                        tween.onDestroyTrigger();
                        this._running.splice(parseInt(i), 1);
                    } else {
                        tween.complete();
                    }
                }
            }
        }

        // TODO -- URGENT! This does not look or return tweens that are currently running
        
        /**
         * @param {string} name
         * @param {boolean} cached
         */
        remove(name:string, cached:boolean = false) {
            // look in both this._tweens and this._running for the tween
            let tween = this.getTween(name);
            // if tween creation failed, return
            if(tween instanceof Tween == false) { return };
            // remove reference to this object
            tween = null;
        }

        /**
         * Return the tween by name 
         * @param {string} name
         */
        getTween(name:string) {
            let flag = false;
            let index:string = null;
            // search the cached tweens array
            for(let i in this._tweens) {
                if(name === i) {
                    flag = true;
                    index = i;
                }
            }
            // search the currently running array
            for(let i in this._running) {
                if(name === i) {
                    flag = true;
                    index = i;
                }
            }
            // if tween has been found, return it, else throw error and return false
            if(!flag) {
                console.error('No tween with the name "' + name + '" found!');
                return false;
            } else {
            return this._tweens[index];
            }
        }

        /**
         * Shorter naming for retreiving a tween
         */
        find(name:string):Tween {
            let tween = this.getTween(name);
            return tween || false;
        }

        /**
         * Provides access to Robert Penner's easing equations 
         */
        get easing():Easing {
            return this._easing;
        }

        /**
         * Give access to the events class
         */
        get events():Events {
            return this._events;
        }
    }
}