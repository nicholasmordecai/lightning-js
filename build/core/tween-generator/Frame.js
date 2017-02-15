/// <reference path="./Interfaces/Property.ts" />
/// <reference path="./Interfaces/Callback.ts" />
/**
 * Frame class. Defines what each frame should consist of in an animation
 */
var Tween;
(function (Tween) {
    var Frame = (function () {
        function Frame(frameId, relative) {
            this._frameId = frameId;
            this._properties = new Array();
            this._relative = relative;
        }
        /**
         * Add another property to this frame
         */
        Frame.prototype.addProperty = function (property, val) {
            var p = { prop: property, val: val };
            this._properties.push(p);
        };
        Object.defineProperty(Frame.prototype, "frameId", {
            get: function () {
                return this._frameId;
            },
            set: function (value) {
                this._frameId = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Frame.prototype, "properties", {
            get: function () {
                return this._properties;
            },
            set: function (value) {
                this._properties = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Frame.prototype, "relative", {
            get: function () {
                return this._relative;
            },
            set: function (value) {
                this._relative = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Frame.prototype, "complex", {
            get: function () {
                return this._complex;
            },
            set: function (value) {
                this._complex = value;
            },
            enumerable: true,
            configurable: true
        });
        return Frame;
    }());
    Tween.Frame = Frame;
})(Tween || (Tween = {}));
//# sourceMappingURL=Frame.js.map