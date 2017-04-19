/// <reference path="./../reference.d.ts" />
var Lightning;
(function (Lightning) {
    var Easing = (function () {
        function Easing() {
        }
        Easing.prototype.none = function (x, t, b, c, d) {
            return c * t / d + b;
        };
        Easing.prototype.easeInQuad = function (t, b, c, d) {
            return c * (t /= d) * t + b;
        };
        Easing.prototype.easeOutQuad = function (x, t, b, c, d) {
            return -c * (t /= d) * (t - 2) + b;
        };
        Easing.prototype.easeInOutQuad = function (x, t, b, c, d) {
            if ((t /= d / 2) < 1)
                return c / 2 * t * t + b;
            return -c / 2 * ((--t) * (t - 2) - 1) + b;
        };
        Easing.prototype.easeInCubic = function (x, t, b, c, d) {
            return c * (t /= d) * t * t + b;
        };
        Easing.prototype.easeOutCubic = function (x, t, b, c, d) {
            return c * ((t = t / d - 1) * t * t + 1) + b;
        };
        Easing.prototype.easeInOutCubic = function (x, t, b, c, d) {
            if ((t /= d / 2) < 1)
                return c / 2 * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t + 2) + b;
        };
        Easing.prototype.easeInQuart = function (x, t, b, c, d) {
            return c * (t /= d) * t * t * t + b;
        };
        Easing.prototype.easeOutQuart = function (x, t, b, c, d) {
            return -c * ((t = t / d - 1) * t * t * t - 1) + b;
        };
        Easing.prototype.easeInOutQuart = function (x, t, b, c, d) {
            if ((t /= d / 2) < 1)
                return c / 2 * t * t * t * t + b;
            return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
        };
        Easing.prototype.easeInQuint = function (x, t, b, c, d) {
            return c * (t /= d) * t * t * t * t + b;
        };
        Easing.prototype.easeOutQuint = function (x, t, b, c, d) {
            return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
        };
        Easing.prototype.easeInOutQuint = function (x, t, b, c, d) {
            if ((t /= d / 2) < 1)
                return c / 2 * t * t * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
        };
        Easing.prototype.easeInSine = function (x, t, b, c, d) {
            return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
        };
        Easing.prototype.easeOutSine = function (x, t, b, c, d) {
            return c * Math.sin(t / d * (Math.PI / 2)) + b;
        };
        Easing.prototype.easeInOutSine = function (x, t, b, c, d) {
            return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
        };
        Easing.prototype.easeInExpo = function (x, t, b, c, d) {
            return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
        };
        Easing.prototype.easeOutExpo = function (x, t, b, c, d) {
            return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
        };
        Easing.prototype.easeInOutExpo = function (x, t, b, c, d) {
            if (t == 0)
                return b;
            if (t == d)
                return b + c;
            if ((t /= d / 2) < 1)
                return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
            return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
        };
        Easing.prototype.easeInCirc = function (x, t, b, c, d) {
            return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
        };
        Easing.prototype.easeOutCirc = function (x, t, b, c, d) {
            return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
        };
        Easing.prototype.easeInOutCirc = function (x, t, b, c, d) {
            if ((t /= d / 2) < 1)
                return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
            return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
        };
        Easing.prototype.easeInElastic = function (x, t, b, c, d) {
            var s = 1.70158;
            var p = 0;
            var a = c;
            if (t == 0)
                return b;
            if ((t /= d) == 1)
                return b + c;
            if (!p)
                p = d * .3;
            if (a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            }
            else
                var s = p / (2 * Math.PI) * Math.asin(c / a);
            return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        };
        Easing.prototype.easeOutElastic = function (x, t, b, c, d) {
            var s = 1.70158;
            var p = 0;
            var a = c;
            if (t == 0)
                return b;
            if ((t /= d) == 1)
                return b + c;
            if (!p)
                p = d * .3;
            if (a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            }
            else
                var s = p / (2 * Math.PI) * Math.asin(c / a);
            return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
        };
        Easing.prototype.easeInOutElastic = function (x, t, b, c, d) {
            var s = 1.70158;
            var p = 0;
            var a = c;
            if (t == 0)
                return b;
            if ((t /= d / 2) == 2)
                return b + c;
            if (!p)
                p = d * (.3 * 1.5);
            if (a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            }
            else
                var s = p / (2 * Math.PI) * Math.asin(c / a);
            if (t < 1)
                return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
        };
        Easing.prototype.easeInBack = function (x, t, b, c, d, s) {
            if (s == undefined)
                s = 1.70158;
            return c * (t /= d) * t * ((s + 1) * t - s) + b;
        };
        Easing.prototype.easeOutBack = function (x, t, b, c, d, s) {
            if (s == undefined)
                s = 1.70158;
            return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
        };
        Easing.prototype.easeInOutBack = function (x, t, b, c, d, s) {
            if (s == undefined)
                s = 1.70158;
            if ((t /= d / 2) < 1)
                return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
            return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
        };
        Easing.prototype.easeOutBounce = function (x, t, b, c, d) {
            if ((t /= d) < (1 / 2.75)) {
                return c * (7.5625 * t * t) + b;
            }
            else if (t < (2 / 2.75)) {
                return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
            }
            else if (t < (2.5 / 2.75)) {
                return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
            }
            else {
                return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
            }
        };
        return Easing;
    }());
    Lightning.Easing = Easing;
})(Lightning || (Lightning = {}));
//# sourceMappingURL=Easing.js.map