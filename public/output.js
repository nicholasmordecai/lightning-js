// stats.js - http://github.com/mrdoob/stats.js
var Stats=function(){function f(a,e,b){a=document.createElement(a);a.id=e;a.style.cssText=b;return a}function l(a,e,b){var c=f("div",a,"padding:0 0 3px 3px;text-align:left;background:"+b),d=f("div",a+"Text","font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px;color:"+e);d.innerHTML=a.toUpperCase();c.appendChild(d);a=f("div",a+"Graph","width:74px;height:30px;background:"+e);c.appendChild(a);for(e=0;74>e;e++)a.appendChild(f("span","","width:1px;height:30px;float:left;opacity:0.9;background:"+
b));return c}function m(a){for(var b=c.children,d=0;d<b.length;d++)b[d].style.display=d===a?"block":"none";n=a}function p(a,b){a.appendChild(a.firstChild).style.height=Math.min(30,30-30*b)+"px"}var q=self.performance&&self.performance.now?self.performance.now.bind(performance):Date.now,k=q(),r=k,t=0,n=0,c=f("div","stats","width:80px;opacity:0.9;cursor:pointer");c.addEventListener("mousedown",function(a){a.preventDefault();m(++n%c.children.length)},!1);var d=0,u=Infinity,v=0,b=l("fps","#0ff","#002"),
A=b.children[0],B=b.children[1];c.appendChild(b);var g=0,w=Infinity,x=0,b=l("ms","#0f0","#020"),C=b.children[0],D=b.children[1];c.appendChild(b);if(self.performance&&self.performance.memory){var h=0,y=Infinity,z=0,b=l("mb","#f08","#201"),E=b.children[0],F=b.children[1];c.appendChild(b)}m(n);return{REVISION:14,domElement:c,setMode:m,begin:function(){k=q()},end:function(){var a=q();g=a-k;w=Math.min(w,g);x=Math.max(x,g);C.textContent=(g|0)+" MS ("+(w|0)+"-"+(x|0)+")";p(D,g/200);t++;if(a>r+1E3&&(d=Math.round(1E3*
t/(a-r)),u=Math.min(u,d),v=Math.max(v,d),A.textContent=d+" FPS ("+u+"-"+v+")",p(B,d/100),r=a,t=0,void 0!==h)){var b=performance.memory.usedJSHeapSize,c=performance.memory.jsHeapSizeLimit;h=Math.round(9.54E-7*b);y=Math.min(y,h);z=Math.max(z,h);E.textContent=h+" MB ("+y+"-"+z+")";p(F,b/c)}return a},update:function(){k=this.end()}}};"object"===typeof module&&(module.exports=Stats);var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="./../reference.d.ts" />
var Game;
(function (Game) {
    var State = (function (_super) {
        __extends(State, _super);
        function State(game) {
            var _this = _super.call(this) || this;
            _this.game = game;
            return _this;
        }
        State.prototype.start = function () {
            this.game.state = this;
        };
        State.prototype.update = function () {
        };
        State.prototype.create = function () {
        };
        return State;
    }(PIXI.Container));
    Game.State = State;
})(Game || (Game = {}));
/// <reference path="./../reference.d.ts" />
var Game;
(function (Game) {
    var Engine = (function () {
        // game engine constructor
        function Engine(width, height) {
            this._activateState = null;
            this._states = {};
            this._stats = new Stats();
            this._renderer = PIXI.autoDetectRenderer(width, height);
            this._renderer.backgroundColor = 0x3498db;
            this._world = new PIXI.Container();
            this._world.interactive = true;
            this._world.mousedown = this._world.touchstart = (function (data) {
            });
            document.getElementById('app-container').appendChild(this._renderer.view);
            console.log(window);
            // init the ticker
            this._ticker = PIXI.ticker.shared;
            this._ticker.autoStart = true;
            this._ticker.add(this.update, this);
            this.resize();
            this._stats.setMode(0);
            document.getElementById('app-container').appendChild(this._stats.domElement);
        }
        // gets called on update
        Engine.prototype.update = function (time) {
            this._stats.begin();
            this._activateState.update();
            TWEEN.update(time);
            this._renderer.render(this._world);
            this._stats.end();
        };
        Engine.prototype.resize = function () {
            var _this = this;
            window.onresize = function (event) {
                var w = window.innerWidth;
                var h = window.innerHeight;
                _this._renderer.view.style.width = w + "px";
                _this._renderer.view.style.height = h + "px";
                _this._renderer.resize(w, h);
            };
        };
        Engine.prototype.startState = function (name) {
            var state = this._states[name].state;
            state.create();
            if (this._activateState === null) {
                this._activateState = state;
                this._world.addChild(this._activateState);
            }
            else {
                this._activateState = state;
            }
        };
        Engine.prototype.addState = function (name, state) {
            var iState = new Object();
            iState.state = state;
            this._states[name] = iState;
        };
        Object.defineProperty(Engine.prototype, "backgroundColor", {
            set: function (val) {
                this._renderer.backgroundColor = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Engine.prototype, "state", {
            set: function (val) {
                this._activateState = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Engine.prototype, "world", {
            get: function () {
                return this._world;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Engine.prototype, "width", {
            get: function () {
                return this._renderer.width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Engine.prototype, "height", {
            get: function () {
                return this._renderer.height;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Engine.prototype, "renderer", {
            get: function () {
                return this._renderer;
            },
            enumerable: true,
            configurable: true
        });
        return Engine;
    }());
    Game.Engine = Engine;
})(Game || (Game = {}));
/// <reference path="./../reference.d.ts" />
var Game;
(function (Game) {
    var Shapes;
    (function (Shapes) {
        /**
         * @description Draw a square
         *
         * @param {number} d dimension of the square in pixels
         *
         * @returns {PIXI.Graphics}
         */
        function Square(d) {
            var graphics = new PIXI.Graphics();
            graphics.beginFill(0xffffff, 1);
            graphics.drawRect(0, 0, d, d);
            graphics.endFill();
            return graphics;
        }
        Shapes.Square = Square;
        /**
         * @description Draw a rectangle
         *
         * @param {number} w width of the rectangle in pixels
         * @param {number} h height of the rectangle in pixels
         *
         * @returns {PIXI.Graphics}
         */
        function Rect(w, h) {
            var graphics = new PIXI.Graphics();
            graphics.beginFill(0xffffff, 1);
            graphics.drawRect(0, 0, w, h);
            graphics.endFill();
            return graphics;
        }
        Shapes.Rect = Rect;
        /**
         * @description Draw a rectangle
         *
         * @param {number} w width of the rectangle in pixels
         * @param {number} h height of the rectangle in pixels
         * @param {number} d depth of rectangle in pixels
         *
         * @returns {PIXI.Graphics}
         */
        function Rect3D(w, h, d) {
            w *= 2, h *= 2, d *= 2;
            var graphics = new PIXI.Graphics();
            // draw front
            graphics.beginFill(0xffffff, 1);
            graphics.drawRect(0, 0, w, h);
            graphics.endFill();
            // draw top side
            var topSide = new PIXI.Graphics();
            topSide.beginFill(0xd2d2d2, 1);
            topSide.moveTo(0, 0);
            topSide.lineTo(d, -d);
            topSide.lineTo(w + d, -d);
            topSide.lineTo(w, 0);
            topSide.lineTo(0, 0);
            topSide.endFill();
            graphics.addChild(topSide);
            //draw right ride
            var rightSide = new PIXI.Graphics();
            rightSide.beginFill(0xababab, 1);
            rightSide.moveTo(w, 0);
            rightSide.lineTo(w + d, -d);
            rightSide.lineTo(w + d, h - d);
            rightSide.lineTo(w, h);
            rightSide.lineTo(w, 0);
            rightSide.endFill();
            graphics.addChild(rightSide);
            return graphics;
        }
        Shapes.Rect3D = Rect3D;
        /**
         * @description Draw a circle
         *
         * @param {number} r Radius of the circle in pixels
         *
         * @returns {PIXI.Graphics}
         */
        function Circle(r) {
            var graphics = new PIXI.Graphics();
            graphics.beginFill(0xffffff, 1);
            graphics.arc(75, 75, r, 0, Math.PI * 2, false);
            graphics.endFill();
            return graphics;
        }
        Shapes.Circle = Circle;
    })(Shapes = Game.Shapes || (Game.Shapes = {}));
})(Game || (Game = {}));
/// <reference path="./../reference.d.ts" />
var Game;
(function (Game) {
    var Icons;
    (function (Icons) {
        /**
         * @description Draw a hamburger menu icon
         *
         * @param {number} s size of the icon in pixels
         *
         * @returns {PIXI.Graphics}
         */
        function Hamburger(s) {
            var graphics = new PIXI.Graphics();
            graphics.beginFill(0xffffff, 1);
            graphics.drawRect(0, 0, s, s * 0.15);
            graphics.drawRect(0, s * 0.4, s, s * 0.15);
            graphics.drawRect(0, s * 0.8, s, s * 0.15);
            graphics.endFill();
            return graphics;
        }
        Icons.Hamburger = Hamburger;
    })(Icons = Game.Icons || (Game.Icons = {}));
})(Game || (Game = {}));
/// <reference path="./../reference.d.ts" />
var Game;
(function (Game) {
    var Prefab;
    (function (Prefab) {
        var ObstacleRect = (function (_super) {
            __extends(ObstacleRect, _super);
            function ObstacleRect(game) {
                var _this = _super.call(this) || this;
                _this.game = game;
                _this.x = _this.game.width * 0.5;
                _this.y = 200;
                _this.tint = 0x846552;
                _this.scale = new PIXI.Point(0.5, 0.5);
                _this.anchor = new PIXI.Point(0.5, 0.5);
                _this.createTexture();
                return _this;
            }
            ObstacleRect.prototype.createTexture = function () {
                var texture = Game.Shapes.Rect3D(this.game.width * 0.2, this.game.height * 0.2, this.game.width * 0.015);
                this.texture = this.game.renderer.generateTexture(texture);
            };
            return ObstacleRect;
        }(PIXI.Sprite));
        Prefab.ObstacleRect = ObstacleRect;
    })(Prefab = Game.Prefab || (Game.Prefab = {}));
})(Game || (Game = {}));
/// <reference path="./../reference.d.ts" />
var Game;
(function (Game) {
    var States;
    (function (States) {
        var Boot = (function (_super) {
            __extends(Boot, _super);
            function Boot(game) {
                var _this = _super.call(this, game) || this;
                _this._obstacles = new PIXI.Container();
                _this._speed = 2;
                _this._distance = 0;
                return _this;
            }
            Boot.prototype.create = function () {
                this._obstacles = new PIXI.Container();
                this.addChild(this._obstacles);
                var leftSide = Game.Shapes.Rect(this.game.width * 0.17, this.game.height);
                leftSide.tint = 0x846552;
                this.addChild(leftSide);
                var leftSideBack = Game.Shapes.Rect(leftSide.width * 0.15, this.game.height);
                leftSideBack.x = leftSide.width - leftSideBack.width;
                leftSideBack.tint = 0x000000;
                leftSideBack.alpha = 0.4;
                leftSide.addChild(leftSideBack);
                var rightSide = Game.Shapes.Rect(this.game.width * 0.17, this.game.height);
                rightSide.tint = 0x846552;
                rightSide.x = this.game.width - this.game.width * 0.17;
                this.addChild(rightSide);
                var rightSideBack = Game.Shapes.Rect(rightSide.width * 0.15, this.game.height);
                rightSideBack.x = rightSideBack.x;
                rightSideBack.tint = 0x000000;
                rightSideBack.alpha = 0.4;
                rightSide.addChild(rightSideBack);
                // let obstacle = Game.Shapes.Rect(this.game.width * 0.2, this.game.height * 0.2);
                // obstacle.x = this.game.width * 0.5 - obstacle.width * 0.5;
                // this._obstacles.addChild(obstacle);
                var bar = Game.Shapes.Rect(this.game.width, this.game.height * 0.1);
                bar.tint = 0x007DA2;
                this.addChild(bar);
                var menuButton = Game.Icons.Hamburger(bar.height * 0.4);
                ;
                menuButton.x = bar.width * 0.1;
                menuButton.y = bar.height * 0.5 - menuButton.height * 0.5;
                bar.addChild(menuButton);
                var barShaddow = Game.Shapes.Rect(bar.width, bar.height * 0.1);
                barShaddow.tint = 0x000000;
                barShaddow.alpha = 0.1;
                barShaddow.y = bar.height;
                bar.addChild(barShaddow);
                var bottomBar = Game.Shapes.Rect(this.game.width, this.game.height * 0.06);
                bottomBar.tint = 0x007DA2;
                bottomBar.y = this.game.height - bottomBar.height;
                this.addChild(bottomBar);
                var bottomBarShaddow = Game.Shapes.Rect(bottomBar.width, bottomBar.height * 0.1);
                bottomBarShaddow.tint = 0x000000;
                bottomBarShaddow.alpha = 0.1;
                bottomBarShaddow.y = -bottomBarShaddow.height;
                bottomBar.addChild(bottomBarShaddow);
                this.createObstacle();
                var cords = { x: 0, y: 0 };
                var tween = new TWEEN.Tween(cords)
                    .to({ x: 100, y: 100 }, 1000)
                    .start();
            };
            Boot.prototype.createObstacle = function () {
                var o = new Game.Prefab.ObstacleRect(this.game);
                this._obstacles.addChild(o);
            };
            Boot.prototype.update = function () {
                this._distance++;
                for (var _i = 0, _a = this._obstacles.children; _i < _a.length; _i++) {
                    var i = _a[_i];
                    i.y += this._speed;
                    if (i.y - this.game.height * 0.2 * 0.5 > this.game.height) {
                        i.y = -100;
                    }
                }
            };
            return Boot;
        }(Game.State));
        States.Boot = Boot;
    })(States = Game.States || (Game.States = {}));
})(Game || (Game = {}));
/// <reference path="./reference.d.ts" />
var app;
(function (app_1) {
    var app = (function () {
        function app() {
            this.game = new Game.Engine(window.innerWidth, window.innerHeight);
            // var test = require('./../static/test.json');
            this.game.addState('boot', new Game.States.Boot(this.game));
            this.game.startState('boot');
        }
        return app;
    }());
    app_1.app = app;
})(app || (app = {}));
new app.app();
