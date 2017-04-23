"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var GameState = (function (_super) {
    __extends(GameState, _super);
    function GameState() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.test = 1;
        return _this;
    }
    GameState.prototype.create = function () {
        var timer = new Lightning.Timer(this.game);
        // let t1 = timer.events.subscribe('tick', function(params, event, time) {
        //     console.log(this.test)
        // }, this, 'hello', 123, true, null);
        // let t1 = timer.events.subscribe('tick', (params, event, time) => {
        //     console.log(params, this.test)
        // }, null, 3);
        // timer.events.remove('tick', t1);
        var e = new Lightning.EventEmitter();
        var event = e.create('test');
        var i = e.subscribe('test', function () {
            console.log('hi');
        });
        console.log(i);
    };
    return GameState;
}(Lightning.State));
exports.default = GameState;
