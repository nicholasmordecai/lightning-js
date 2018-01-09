/// <reference path="./../../reference.d.ts" />

/**
 * TODO
 * 
 * Refactor arrays of scenes and active scenes for dictionary definition objects
 * Implement freeze scene feature
 * Possibly refactor the scene destroy method (cycle through and also destroy all physics bodies associated with that scene)
 * Easy to use prepare function, to create a scene, but not allow it to be rendered until ready
 */

namespace Lightning {
    export class SceneManager extends Plugin {

        protected game:Engine;
        protected _scenes;
        protected _activeScenes:Array<iSceneMap>;

        private _verbose:boolean;

        /**
         * @description SceheManager constructor
         * 
         * @param {Engine} game
         */
        constructor(game:Engine) {
            super(game);
            this.game = game;
            this._scenes = [];
            this._activeScenes = [];
            this._verbose = false;
        }

        /**
         * @description Update loop. Called from the game ticker and is used to call each scene update function individually
         */
        protected update(time:number) {
            for(let map of this._scenes) {
                if(map.active) {
                    map.scene.update(time);                    
                }
            }
        }

        /**
         * @description Start a scene. This function is called in order to add a scene to the world display list and call the init function if the scene is to auto initalize
         */
        public start(key, destroyCurrentScene:boolean = true, autoInit:boolean = true, ...params) {
            if(this._verbose) console.info('SceneManager - Start Scene: "' + key + '"');

            // should the scene manager destroy all active scenes?
            if(destroyCurrentScene) {
                for(let map of this._activeScenes) {
                    // ignore destroying the scene being started if it's already active
                    if(map.key !== key) {
                        this.destroy(map.key);
                    }   
                }
            }

            let map = this.findScene(key);

            let scene = new map.refClass();
            this.game.world.addChild(scene);
            
            scene.visible = true;
            scene.renderable = true;
            scene.interactive = true;
            scene.interactiveChildren = true;
            
            map.scene = scene;

            if(autoInit) {
                this.init(map, params);
            }
        }

        /**
         * @description Initalize a single scene. Usually called from the start function, though this can be bypassed and a custom scene injected via this function
         * 
         * @param {Scene} scene
         * @param {Array} params
         * 
         * @returns {boolean}
         */
        public init(map:iSceneMap, ...params):void {
            if(this._verbose) console.info('SceneManager - Initalising scene: "' + map.key + '"');
            let scene = map.scene;
            scene.construct(this.game)
            this.addToActive(map);
            scene.init(params);
        }

        /**
         * @description Leaves the scene renderable and interactive but disables it's update procedure
         *
         * @param {string} key
         * 
         * @returns {boolean}
         */
        public pause(key:string):boolean {
            let scene = this.findScene(key);
            this._activeScenes.splice(this.findActiveIndex(scene));
            return true;
        }

        /**
         * @description Re-enabled the scene's update procedure
         *
         * @param {string} key
         * 
         * @returns {boolean}
         */
        public unpause(key:string):boolean {
            let scene = this.findScene(key);
            this.addToActive(scene);
            return true;
        }

        /**
         * TODO
         * @description Will reset the scene by nullifying it and calling the constructor to re-initalize it
         */
        public restart(key: string) {
            let scene = this.findScene(key);
            this.destroy(key);
            this.start(key);
        }

        /**
         * @description Will remove the scene from the render list and update loop. It will also set all 
         * interactivity to false as well as visibility and renderable.
         * Will store it's current position in the display list incase it is to be re-enabled at the same position
         * 
         * @returns {boolean}
         */
        public disable(key:string):boolean {
            let map = this.findScene(key);
            let scene = map.scene;
            
            // store the world index
            map.worldIndex = this.game.world.getChildIndex(map.scene);

            // disable properties
            scene.interactive = false;
            scene.interactiveChildren = false;
            scene.visible = false;
            scene.renderable = false;
            // remove from the display list
            this.game.world.removeChild(scene);

            // get index from array and splice
            this._activeScenes.splice(this.findActiveIndex(map));

            return true;
        }

        /** 
         * @description Will re-enable a scene exactly as it was before being disabled. 
         * Sets all visibility, interactivity and renderable to true. 
         * If last index is passed, it will use the previous position in the world display list
         * If the index is passed, it will be added to the world display list where the index is
         * If last index is false and index is null, then it will get added to the top of the world display list
         * 
         * @returns {boolean}
         */
        public enable(key:string, lastIndex:boolean = true, index:number = null):boolean {
            let map = this.findScene(key);
            let scene:Scene = map.scene;
            scene.visible = true;
            scene.renderable = true;
            scene.interactive = true;
            scene.interactiveChildren = true;
            if(lastIndex === true) {
                this.game.world.addChildAt(scene, map.worldIndex);
            } else if (index !== null){
                this.game.world.addChildAt(scene, index);
            } else {
                this.game.world.addChild(scene);
            }

            return true;
        }

        /**
         * @description Destroy the scene entirley
         * Removes from the world children
         * Removes from the active scenes array
         * sets visible, renderable and all interactivity to false
         * 
         * @param {string} key
         * 
         * @returns {boolean}
         */
        public destroy(key:string):boolean {
            if(this._verbose) console.info('SceneManeger - Destroying Scene: "' + key + '"');
            // get the scene
            let map = this.findScene(key);
            let scene = map.scene;

            // get index from array and splice first, to stop any updates whilst the scene is being destroyed
            map.active = false;
            this._activeScenes.splice(this.findActiveIndex(map));

            // disable properties
            scene.visible = false;
            scene.renderable = false;
            scene.interactive = false;
            scene.interactiveChildren = false;

            // destroy stuff
            this.destroyAllChildren(scene);
            scene.destroyTimers();

            /**
             * Should find a more robust way of doing this
             */
            // remove from the game world
            this.game.world.removeChild(scene);
            

            /**
             * Give thoughts to how to better clean up a destroyed scene
             */
            // finally, nullify so GC can free up space
            // scene = null;

            return true;
        }

        private destroyAllChildren(rootObject:PIXI.Container) {
            for(let child of rootObject.children) {
                child.destroy();
            }
        }

        /**
         * @description Adds a new scene to the scene SceneManager
         * 
         * @param {string} key
         * @param {Scene} scene
         * 
         * @returns {boolean}
         */
        public add(key:string, scene:Function):boolean {
            if(this._verbose) console.info('SceneManager - Adding New Scene: "' + key + '"');
            let newMap:iSceneMap = <iSceneMap>{};
            newMap.key = key;
            newMap.scene = null;
            newMap.active = false;
            newMap.worldIndex = null;
            newMap.fps = 60;
            newMap.refClass = scene
            this._scenes.push(newMap);
            return true;
        }
        
        /**
         * @description Adds a scene to the active scene array if it's not already there
         * 
         * @param {Scene} scene
         * 
         * @returns {boolean}
         */
        private addToActive(map:iSceneMap):boolean {
            if(!this.isActive(map)) {
                if(this._verbose) {
                    console.log('adding map to active scenes', map.key)
                }
                this._activeScenes.push(map);
                map.active = true;
                return true;
            } else {
                return false;
            }
        }

        private isActive(map:iSceneMap):boolean {
            for(let i of this._activeScenes) {
                if(i.key === map.key) {
                    return true;
                }
            }
            return false;
        }

        /**
         * TODO
         * @description Will create a texture of the scene as it currently is and apply it to the scene as it's only renderable child. This could be used when large scene transitions are happening and the display list gets too large and effects performance
         */
        public freeze() {

        }

        /**
         * @description Loop through the scenes array and match by key. If one is found, then the entire scene map is returned
         * 
         * @param {string} key
         * 
         * @returns {Scene}
         */
        private findScene(key:string) {
            for(let i of this._scenes) {
                if(i.key === key) {
                    return i;
                }
            }
            return null;
        }

        /**
         * @description Loops through all active scenes and matches by a scene
         * 
         * @param {Scene} 
         * 
         * @returns {number}
         */
        private findActiveIndex(map:iSceneMap):number {
            let count:number = 0;
            for(let i of this._activeScenes) {
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