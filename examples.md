# Ligtening Examples
A quick guide for the major parts of Lightening to setup and get going quickly.

### Game Initalisation
```js
namespace app {
    export class app {

        public game:Lightening.Engine;

        constructor() {
            this.game = new Lightening.Engine(window.innerWidth, window.innerHeight);
        }
    }
}
```

### Public Game Properties
```js
this.game.width; // width of the renderer
this.game.height; // height of the renderer
this.game.renderer; // the active renderer object
this.game.world; // the root container for the drawing
this.game.tweens; // reference to the tween manager singleton
this.game.signals; // reference to the signal manager singleton
this.game.backgroundColor // sets the background colour of the root stage
```

### State Initalisation
```js
this.game.startState(Lightening.States.PreloadState);
```

### State Creation
```js
namespace Lightening {
    export namespace States {
        export class PreloadState extends State {

            constructor(game:Engine) {
                super(game);
            }

            init(params) {
                this.create();
            }

            create() {
            
            }
        }
    }
}
```

### Sprites
```js
// if using outside of Lightening Namespace
let sprite = new Lightening.UI.Sprite();
sprite.texture = texture;

// if inside Lightening Namespace
let sprite = new Lightening.UI.Sprite();
sprite.texture = texture;
```

### Geometry
```js
let square = Lightening.UI.Shapes.Square(width);
let rectangle = Lightening.UI.Shapes.Rect(width, heihgt);
let star = Lightening.UI.Shapes.Star(width, height);
let rectangle3d = Ligthening.UI.Shapes.Rect3D(width, height, depth);
let circle = Lightening.UI.Shapes.Circle(radius);
let triangle = Lightening.UI.Shapes.Circle(length);
```

### Signals
```js
this.game.signals.create('preloadComplete');

this.game.signals.add('preloadComplete', () => {
    // my callback with lexical scope
});

// event function without lexical scope
this.game.signals.add('preloadComplete', this.complete, this);

// dispatch signal with optional params
this.game.signals.dispatch('preloadComplete', {data: 0});
```

### Tweens

#### Management
```js
// Creating a new tween
this.game.tweens.create('newTween', 'alpha', 0, 100, 250, this.game.tweens.easing.easeOutExpo);

//Extending tweens (merging two or more tweens to run sequentially as one tween)
this.game.tweens.extend('newTween', ['tween1', 'tween2'], false);

// Running a tween
this.game.tweens.start(obj.scale, 'popInX', false, 0, false);

// Remove a tween
this.game.tweens.remove('tweenName', true);

//Retreiving a tween
this.game.tweens.find('tweenName');
```

#### Tween Maniuplation

> Direct object manipulation requires a reference to the tween. Using the find function will return a reference to the tween if found.

```js
// Start
tween.start(false, 0, false);

// Pause
tween.pause();

// Set Frame
tween.frame = 11;

// Auto Destroy
tween.autoDestroy = false;

// Looping Enabled
tween.looping = true;

// Loops Remaining
tween.loopsRemaining = 3;

// Reset
tween.frame = 0;

// Destroy
tween.destroy();
```

#### Events
> All events can be called with 'add', 'addOnce', 'remove' or 'removeAll'.
```js
// On Start
tween.onStart.add('refName', () => {
    ...
});

tween.onStart.remove('refName');

// On Stop
tween.onStop.addOnce('refName', () => {
    ...
});

tween.onStop.removeAll();

// On Loop
tween.onLoop.add('refName', () => {
    ...
});

// On Destroy
tween.onDestroy.add('refName', () => {
    ...
});

// On Frame
tween.onFrame.add(10, 'refName', () => {
    ...
});

// On Tick
tween.onTick.addOnce('refName', () => {
    ...
});
```

### Color Pallets
> these are a very useful feature for when you want to quickly change themes during gameplay. Edit the file in src/utils/colours.ts and export constants.

```js
namespace Lightening.Utils.Colours {
    export const DARK:number = 0x161520;
    export const BG:number = 0x222232;
    export const MEDIUM:number = 0x565691;
    export const LIGHTBLUE:number = 0xAEDEDB;
    export const GOLD:number = 0xF0D66F;
    export const DIAMOND:number = 0x3BB0DD;
    export const ORANGE:number = 0xF04F50;
    export const WHITE:number = 0xFFFFFF;
}

// usage
let sprite = Lightening.UI.Sprite();
sprite.tint = Lightening.Utils.Colours.Medium;
```

