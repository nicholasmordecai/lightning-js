/// <reference path="./../reference.d.ts" />
var Lightning;
(function (Lightning) {
    var Debug = (function () {
        function Debug(game, chartWidth, chartHeight, segmentation, maxSegment) {
            if (chartWidth === void 0) { chartWidth = 300; }
            if (chartHeight === void 0) { chartHeight = 200; }
            if (segmentation === void 0) { segmentation = 30; }
            if (maxSegment === void 0) { maxSegment = 25; }
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
        Debug.prototype.createChart = function () {
            var _this = this;
            this._dataArray = [];
            this._dataArray.push([], [], []);
            this._currentDataSelector = 0;
            var background = Lightning.Geometry.Rect(this._chartWidth, this._chartHeight);
            background.tint = 0x1a1a1a;
            this._chart = new Lightning.Sprite(this.game.generateTexture(background));
            this._chart.enableInput();
            this._chart.input.onClick(function () {
                _this._currentDataSelector++;
                if (_this._currentDataSelector > _this._dataArray.length - 1) {
                    _this._currentDataSelector = 0;
                }
            });
            this._chartLine = new Lightning.Sprite();
            this._chartLine.y += this._paddingTop;
            this.game.world.addChild(this._chart);
            this._chart.addChild(this._chartLine);
            this._timer = new Lightning.Timer(this.game);
            this._timer.interval = 300;
            this._timer.events.subscribe('tick', this.update, this);
        };
        Debug.prototype.update = function () {
            // let fps:number = Math.round(this.game.fps);
            var fps = Math.round(Math.random() * 60);
            if (this._cPos >= this._maxSegmentsToShow) {
                for (var _i = 0, _a = this._dataArray; _i < _a.length; _i++) {
                    var i_1 = _a[_i];
                    i_1.splice(0, 1);
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
            if (this._performanceAvailable) {
                this._dataArray[2].push(window.performance['memory']['usedJSHeapSize']);
            }
            var nLine = new Lightning.Graphics();
            nLine.lineStyle(2, 0xffa500, 1);
            var c = 0;
            var flag = false;
            var s = 100 / 60;
            var dist = this._minLineHeight - this._maxLineHeight;
            for (var _b = 0, _c = this._dataArray[this._currentDataSelector]; _b < _c.length; _b++) {
                var i = _c[_b];
                var drawWidth = c * this._wInc;
                var percentage = i * s / 100;
                var drawHeight = dist - (dist * percentage);
                if (c === 0) {
                    nLine.moveTo(drawWidth, drawHeight);
                }
                else {
                    nLine.lineTo(drawWidth, drawHeight);
                }
                c++;
            }
            this._chartLine.texture = nLine.generateCanvasTexture();
            if (this._cPos < this._maxSegmentsToShow) {
                this._cPos++;
            }
        };
        Debug.prototype.performanceAvailable = function () {
            if (window.performance['memory']) {
                this._performanceAvailable = true;
            }
        };
        return Debug;
    }());
    Lightning.Debug = Debug;
})(Lightning || (Lightning = {}));
