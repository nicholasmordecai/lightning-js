/// <reference path="./../reference.d.ts" />
var Lightning;
(function (Lightning) {
    var Engine = (function () {
        // game engine constructor
        function Engine(width, height, canvasId) {
            if (canvasId === void 0) { canvasId = 'app'; }
            this._activateState = null;
            this._tweens = new Tween.TweenManager(this);
            this._signals = new Lightning.Signals.SignalManager(this);
            this._physicsActive = false;
            this._stats = new Stats();
            this._statsEnabled = true;
            var view = document.getElementById(canvasId);
            var debug = document.getElementById('debug');
            if (!debug) {
                var debugCanvas = document.createElement('canvas');
                debugCanvas.id = 'debug';
                document.getElementById('app-container').appendChild(debugCanvas);
            }
            if (!canvasId) {
                var viewCanvas = document.createElement('canvas');
                viewCanvas.id = 'app';
                document.getElementById('app-container').appendChild(viewCanvas);
            }
            this._renderer = PIXI.autoDetectRenderer(width, height, { resolution: window.devicePixelRatio });
            this._renderer.autoResize = true;
            this._world = new PIXI.Container();
            this._world.scale = new PIXI.Point(1 / window.devicePixelRatio, 1 / window.devicePixelRatio);
            this._world.interactive = true;
            this._world.on('mousedown', function () {
                // console.log('container mousedown');
            });
            document.getElementById('app-container').appendChild(this._renderer.view);
            var canvas = document.querySelector('canvas');
            var scale = window.devicePixelRatio;
            var renderer = PIXI.autoDetectRenderer(width * scale, height * scale, canvas);
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';
            // init the ticker
            this._ticker = PIXI.ticker.shared;
            this._ticker.autoStart = true;
            this._ticker.add(this.update, this);
            if (this._statsEnabled) {
                this._stats.setMode(0);
                document.getElementById('app-container').appendChild(this._stats.domElement);
            }
        }
        // gets called on update
        Engine.prototype.update = function (time) {
            if (this._statsEnabled)
                this._stats.begin();
            if (this._physicsActive) {
                this._physicsWorld.Step(1 / 60, 1, 1);
                this._physicsWorld.ClearForces();
            }
            if (this._activateState) {
                this._activateState.update();
            }
            this._tweens.update();
            this._renderer.render(this._world);
            if (this._statsEnabled)
                this._stats.end();
        };
        Engine.prototype.startState = function (state) {
            var params = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                params[_i - 1] = arguments[_i];
            }
            var nState = new state(this);
            this.initState(nState, params);
        };
        Engine.prototype.initState = function (state, params) {
            if (this._activateState === null) {
                this._world.addChild(state);
            }
            else {
                this._world.removeChild(this._activateState);
                this._world.addChild(state);
            }
            this._activateState = state;
            state.init(params);
        };
        Engine.prototype.startPhysics = function () {
            this._physicsWorld = new Box2D.Dynamics.b2World(new Box2D.Common.Math.b2Vec2(0, 10), true);
            this._physicsActive = true;
        };
        Engine.prototype.collideOnWorldBounds = function () {
            this._physicsWorldBounds = new Box2D.Dynamics.b2BodyDef();
            var polyFixture = new Box2D.Dynamics.b2FixtureDef();
            polyFixture.shape = new Box2D.Collision.Shapes.b2PolygonShape();
            polyFixture.density = 1;
            this._physicsWorldBounds = new Box2D.Dynamics.b2BodyDef();
            this._physicsWorldBounds.type = Box2D.Dynamics.b2Body.b2_staticBody;
            //down
            polyFixture.shape.SetAsBox(10, 1);
            this._physicsWorldBounds.position.Set(9, this.height / 100 + 1);
            this.physics.CreateBody(this._physicsWorldBounds).CreateFixture(polyFixture);
            //left
            polyFixture.shape.SetAsBox(1, 100);
            this._physicsWorldBounds.position.Set(-1, 0);
            this.physics.CreateBody(this._physicsWorldBounds).CreateFixture(polyFixture);
            //right
            this._physicsWorldBounds.position.Set(this.height / 100, 0);
            this.physics.CreateBody(this._physicsWorldBounds).CreateFixture(polyFixture);
            this._physicsWorldBounds.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
            var body = Box2D.Dynamics.b2Body;
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
        Object.defineProperty(Engine.prototype, "tweens", {
            get: function () {
                return this._tweens;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Engine.prototype, "signals", {
            get: function () {
                return this._signals;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Engine.prototype, "physics", {
            get: function () {
                return this._physicsWorld;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Engine.prototype, "physicsWorldBounds", {
            get: function () {
                return this._physicsWorldBounds;
            },
            enumerable: true,
            configurable: true
        });
        return Engine;
    }());
    Lightning.Engine = Engine;
})(Lightning || (Lightning = {}));
//# sourceMappingURL=game.js.map