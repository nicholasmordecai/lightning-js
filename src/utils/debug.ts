/// <reference path="./../reference.d.ts" />

namespace Lightning {
    export class Debug {

        private game:Engine;

        private _performanceAvailable:boolean;

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

        private _dataArray:Array<Array<number>>;
        private _currentDataSelector:number;

        constructor(game:Engine, chartWidth:number = 300, chartHeight:number = 200, segmentation:number = 30, maxSegment:number = 25) {
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
            
            this.createChart();

            this._performanceAvailable = false;
            this.performanceAvailable();
        }

        public createChart() {

            this._dataArray = [];
            this._dataArray.push([], [], []);

            this._currentDataSelector = 0;

            let background = Lightning.Geometry.Rect(this._chartWidth, this._chartHeight, 0x1a1a1a);
            this._chart = new Lightning.Sprite(this.game.generateTexture(background));
            this._chart.enableInput();

            this._chart.input.onClick(() => {
                this._currentDataSelector++;
                if(this._currentDataSelector > this._dataArray.length -1) {
                    this._currentDataSelector = 0;
                }
            });

            this._chartLine = new Lightning.Sprite();
            this._chartLine.y += this._paddingTop;
            this.game.world.addChild(this._chart);
            this._chart.addChild(this._chartLine);

            this._timer = new Lightning.Timer(this.game);
            this._timer.interval = 300;
            this._timer.events.subscribe('tick', this.update, this);
        }

        update() {
            // let fps:number = Math.round(this.game.fps);
            let fps:number = Math.round(Math.random() * 60)

            if(this._cPos >= this._maxSegmentsToShow) {
                for(let i of this._dataArray) {
                    i.splice(0, 1);
                }
            }
            
            /**
             * Data Positions Inside the Array
             * 0 = FPS
             * 1 = Display Count
             * 2 = Window Performance - Optional, only available in Chrome
             */
            this._dataArray[0].push(fps);
            this._dataArray[1].push(this.game.displayCount(this.game.world));

            if(this._performanceAvailable) {
                this._dataArray[2].push(window.performance['memory']['usedJSHeapSize']);
            }

            let nLine = new Lightning.Graphics();
            nLine.lineStyle(2, 0xffa500, 1);
            
            let c:number = 0;
            let flag:boolean = false;
            let s:number = 100 / 60;
            let dist:number = this._minLineHeight - this._maxLineHeight;
            for(var i of this._dataArray[this._currentDataSelector]) {

                let drawWidth:number = c * this._wInc;
                let percentage:number = i * s / 100;
                let drawHeight:number = dist - (dist * percentage);

                if(c === 0) {
                    nLine.moveTo(drawWidth, drawHeight);
                } else {
                    nLine.lineTo(drawWidth, drawHeight);
                }
                c++;
            }

            this._chartLine.texture = nLine.generateCanvasTexture();

            if(this._cPos < this._maxSegmentsToShow) {
                this._cPos++;
            }
        }

        private performanceAvailable() {
            if(window.performance['memory']) {
                this._performanceAvailable = true;
            }
        }
    }
}