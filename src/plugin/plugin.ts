/// <reference path="./../reference.d.ts" />

namespace Lightning {
    export class Plugin {

        protected game:Engine;
        protected _events:EventEmitter;

        public constructor(game:Engine, updateLoop:boolean = true, events:boolean = true) {
            this.game = game;
            if(updateLoop){
                this.enableUpdate();
            }

            if(events) {
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