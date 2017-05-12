/// <reference path="./../reference.d.ts" />

namespace Lightning {
    export class Plugin {

        protected game:Engine;
        protected _events:EventEmitter;

        protected _enableUpdateOnStart:boolean;
        protected _enableEventsOnStart:boolean;

        public constructor(game:Engine, updateLoop:boolean = true, events:boolean = true) {
            this.game = game;
            this._enableUpdateOnStart = updateLoop;
            this._enableEventsOnStart = events;
            this.enable();
        }

        public enable() {
            if(this._enableUpdateOnStart){
                this.enableUpdate();
            }

            if(this._enableEventsOnStart) {
                this.enableEvents();
            }
        }

        protected update(time:number) {

        }

        protected enableUpdate() {
            this.game.ticker.add(this.update, this);            
        }

        protected removeUpdate() {
            this.game.ticker.remove(this.update, this);
        }

        protected enableEvents() {
            this._events = new EventEmitter();
        }

        public get events() {
            return this._events;
        }
    }
}