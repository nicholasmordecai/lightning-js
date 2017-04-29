/// <reference path="./../reference.d.ts" />

namespace Lightning {

    export class Easing {
        public static linear(t, b, c, d) {
            return c*t/d + b;
        };

        public static easeInQuad(t, b, c, d) {
            t /= d;
            return c*t*t + b;
        };

        public static easeOutQuad(t, b, c, d) {
            t /= d;
            return -c * t*(t-2) + b;
        };

        public static easeInOutQuad(t, b, c, d) {
            t /= d/2;
            if (t < 1) return c/2*t*t + b;
            t--;
            return -c/2 * (t*(t-2) - 1) + b;
        };

        public static easeInCubic(t, b, c, d) {
            t /= d;
            return c*t*t*t + b;
        };

        public static easeOutCubic(t, b, c, d) {
            t /= d;
            t--;
            return c*(t*t*t + 1) + b;
        };

        public static easeInOutCubic(t, b, c, d) {
            t /= d/2;
            if (t < 1) return c/2*t*t*t + b;
            t -= 2;
            return c/2*(t*t*t + 2) + b;
        };

        public static easeInQuart(t, b, c, d) {
            t /= d;
            return c*t*t*t*t + b;
        };

        public static easeOutQuart(t, b, c, d) {
            t /= d;
            t--;
            return -c * (t*t*t*t - 1) + b;
        };

        public static easeInOutQuart(t, b, c, d) {
            t /= d/2;
            if (t < 1) return c/2*t*t*t*t + b;
            t -= 2;
            return -c/2 * (t*t*t*t - 2) + b;
        };

        public static easeInQuint(t, b, c, d) {
            t /= d;
            return c*t*t*t*t*t + b;
        };

        public static easeOutQuint(t, b, c, d) {
            t /= d;
            t--;
            return c*(t*t*t*t*t + 1) + b;
        };

        public static easeInOutQuint(t, b, c, d) {
            t /= d/2;
            if (t < 1) return c/2*t*t*t*t*t + b;
            t -= 2;
            return c/2*(t*t*t*t*t + 2) + b;
        };

        public static easeInSine(t, b, c, d) {
            return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
        };

        public static easeOutSine(t, b, c, d) {
            return c * Math.sin(t/d * (Math.PI/2)) + b;
        };

        public static easeInOutSine(t, b, c, d) {
            return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
        };

        public static easeInExpo(t, b, c, d) {
            return c * Math.pow( 2, 10 * (t/d - 1) ) + b;
        };

        public static easeOutExpo(t, b, c, d) {
            return c * ( -Math.pow( 2, -10 * t/d ) + 1 ) + b;
        };

        public static easeInOutExpo(t, b, c, d) {
            t /= d/2;
            if (t < 1) return c/2 * Math.pow( 2, 10 * (t - 1) ) + b;
            t--;
            return c/2 * ( -Math.pow( 2, -10 * t) + 2 ) + b;
        };
            
        public static easeInCirc(t, b, c, d) {
            t /= d;
            return -c * (Math.sqrt(1 - t*t) - 1) + b;
        };

        public static easeOutCirc(t, b, c, d) {
            t /= d;
            t--;
            return c * Math.sqrt(1 - t*t) + b;
        };

        public static easeInOutCirc(t, b, c, d) {
            t /= d/2;
            if (t < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
            t -= 2;
            return c/2 * (Math.sqrt(1 - t*t) + 1) + b;
        };

        public static easeInBack(x:number, t:number, b:number, c:number, d:number, s:number):number {
            if (s == undefined) s = 1.70158;
            return c*(t/=d)*t*((s+1)*t - s) + b;
        }

        public static easeOutBack(x:number, t:number, b:number, c:number, d:number, s:number):number {
            if (s == undefined) s = 1.70158;
            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
        }

        public static easeInOutBack(x:number, t:number, b:number, c:number, d:number, s:number):number {
            if (s == undefined) s = 1.70158;
            if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
            return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
        }

        public static easeInElastic(x:number, t:number, b:number, c:number, d:number):number {
            var s=1.70158;var p=0;var a=c;
            if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
            if (a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        }

        public static easeOutElastic(x:number, t:number, b:number, c:number, d:number):number {
            var s=1.70158;var p=0;var a=c;
            if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
            if (a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
        }

        public static easeInOutElastic(x:number, t:number, b:number, c:number, d:number):number {
            var s=1.70158;var p=0;var a=c;
            if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
            if (a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
            return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
        }

        /**
         * -- Missing --
         * Bounce
         * 
         */
    }
}