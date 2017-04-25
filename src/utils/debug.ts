/// <reference path="./../reference.d.ts" />

namespace Lightning {
    export class Debug {

        private game:Engine;

        private _chart:Lightning.Sprite;
        private _chartLine:Lightning.Sprite;
        private _timer:Lightning.Timer;

        private _chartWidth:number;
        private _chartHeight:number;
        private _segmentation:number;
        private _maxSegmentsToShow:number;
        private _wInc:number;
        private _cPos:number;
        private _minLineHeight:number;
        private _maxLineHeight:number;
        private _paddingTop:number;

        private _fpsData:Array<number>;
        private _displayCountData:Array<number>;

        constructor(game:Engine, chartWidth:number = 300, chartHeight:number = 300, segmentation:number = 30, maxSegment:number = 25) {
            this.game = game;

            this._chartWidth = chartWidth;
            this._chartHeight = chartHeight;
            this._segmentation = segmentation;
            this._maxSegmentsToShow = maxSegment;
            this._cPos = 0;
            this._wInc = this._chartWidth / this._segmentation;
            this._minLineHeight = this._chartHeight * 0.85;
            this._maxLineHeight = this._chartHeight * 0.15;
            this._paddingTop = this._chartHeight * 0.15;

            this._timer = new Lightning.Timer(this.game);
            this._timer.interval = 500;
            this._timer.events.subscribe('tick', this.update, this);
            
            this.createChart();
        }

        public createChart() {

            this._fpsData = [];
            this._displayCountData = [];

            let background = Lightning.Geometry.Rect(this._chartWidth, this._chartHeight);
            background.tint = 0x1a1a1a;
            this._chart = new Lightning.Sprite(this.game.generateTexture(background));
            this._chart.enableInput();
            this._chart.input.onClick(() => {
                // change;
            });

            this._chartLine = new Lightning.Sprite;
            this._chart.add(this._chartLine);
            this.game.world.addChild(this._chart);
        }

        update() {
            // let fps = Math.round(this.game.fps);
            let fps:number = Math.floor(Math.random() * 60) + 0; 
            if(this._cPos >= this._maxSegmentsToShow) {
                this._fpsData.splice(0, 1);
            }
            this._fpsData.push(fps);

            let nLine = new Lightning.Graphics();
            nLine.lineStyle(1, 0xffa500, 1);
            nLine.moveTo(0, 0);

            let c:number = 0;
            let flag:boolean = false;
            let s:number = 100 / 60;
            let dist:number = this._minLineHeight - this._maxLineHeight;

            for(var i of this._fpsData) {  
                let drawWidth:number = c * this._wInc;
                let percentage:number = i * s / 100;
                let drawHeight:number = (dist - (dist * percentage) + this._paddingTop);
                nLine.lineTo(drawWidth, drawHeight);
                c++;
            }
            
            // console.log(this.game.debug.displayCount())

            this._chartLine.texture = this.game.generateTexture(nLine);

            if(this._cPos < 20) {
                this._cPos++;
            }
        }

        /**
         * @description recursive pattern to loop over every child and recursivly loop over all of it's children and returning a count of them all from the root object.
         * You can use a specific root display object, or you can leave blank and it will default to the world stage.
         * 
         * Example: 
         * this.game.debug.displayCount();
         * this.game.debug.displayCount(myContainer);
         * 
         * @see {Lightning.Engine}
         * 
         * @param rootObject 
         * @returns {number}
         */
        public displayCount(rootObject:PIXI.DisplayObject = this.game.world):number {
            return ((d) => {
                var c = 0;
                var r = function(d:PIXI.DisplayObject) {
                    c++;
                    for(let i of d['children']) {
                        r(i);
                    }
                }
                r(d);
                return c;
            })(rootObject);
        }
    }
}