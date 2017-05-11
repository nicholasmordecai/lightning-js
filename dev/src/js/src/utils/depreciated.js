/// <reference path="./../reference.d.ts" />
/**
 * Redirect functions for when something gets depreciated.
 * Should try not to do this as often as possible
 */
var Lightning;
(function (Lightning) {
    var Depreciated = (function () {
        function Depreciated() {
        }
        return Depreciated;
    }());
    Lightning.Depreciated = Depreciated;
})(Lightning || (Lightning = {}));
