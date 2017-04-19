/// <reference path="./../reference.d.ts" />
var Lightning;
(function (Lightning) {
    var Debug = (function () {
        function Debug(engine) {
            this.engine = engine;
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
        Debug.prototype.displayCount = function (rootObject) {
            if (rootObject === void 0) { rootObject = this.engine.world; }
            return (function (d) {
                var c = 0;
                var r = function (d) {
                    c++;
                    for (var _i = 0, _a = d['children']; _i < _a.length; _i++) {
                        var i = _a[_i];
                        r(i);
                    }
                };
                r(d);
                return c;
            })(rootObject);
        };
        return Debug;
    }());
    Lightning.Debug = Debug;
})(Lightning || (Lightning = {}));
//# sourceMappingURL=debug.js.map