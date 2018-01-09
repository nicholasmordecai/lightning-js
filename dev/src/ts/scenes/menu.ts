import Test from './../prefabs/test';

export default class MenuState extends Lightning.Scene {

    private particleEmitter;

    init() {
        this.create();
    }

    create() {
    //     let sound = this.game.audio.load('meeseeks', ['audio.mp3']);

    //     this.game.keyboard.key('space').subscribe('pressed', () => {
    //         sound.play();
    //     });

    //     this.game.keyboard.key('a').subscribeOnce('pressed', () => {

    //     });

    //     this.game.keyboard.key('a').subscribeOnce('pressed', () => {

    //     });

    //     let shape = new Lightning.Geometry.MultiShape([
    //         {shape: 'circle', p1: 50, rotation: Math.PI * 0.2},
    //         {shape: 'circle', p1: 35, x: -40, y: -40},
    //         {shape: 'circle', p1: 25, x: -60, y: -70},
    //         {shape: 'circle', p1: 15, x: -75, y: -95, rotation: Math.PI * 0.2}
    //     ]);

    //     this.add(shape);
    //     shape.x = this.game.center.x;
    //     shape.y = this.game.height * 0.5;

        // let tween = this.game.tweens.create(button);
        // tween.createAnim(
        //     0, 300, 1500, 'x', Lightning.Easing.ElasticInOut
        // );

        // tween.start();

        // button.interactive = true;
        // button.on('pointerdown', () => {
        //     console.log('yoo')
        //     this.game.states.start('game');
        // });

        this.particleEmitter = new Lightning.ParticleEmitter(this, 0, 0);
        this.add(this.particleEmitter);

        // generate a texture for the particle emitter
        let texture:Lightning.Texture = Lightning.Geometry.Rect(8, 8, 0xff22aa).generateTexture();

        // add that texture to the particle emitter
        this.particleEmitter.add(texture);

        this.particleEmitter.enableDebug();

        this.particleEmitter.setGravity(0, 0);
        this.particleEmitter.setSpread(0, this.game.width, 0, this.game.height);
        this.particleEmitter.setVelocityRange(-0.3, 0.3, -0.3, 0.3);
        this.particleEmitter.setInterval(50);
        this.particleEmitter.addToLocal = false;
        this.particleEmitter.setRotationIncrement(-0.1, 0.1)
        this.particleEmitter.setAlphaIncrement(-0.005);
        this.particleEmitter.setStrength(2);


        this.particleEmitter.preFillPool(300);

        this.particleEmitter.advance(2500);
        
        this.particleEmitter.start();

        // let t = Lightning.Geometry.Rect(50, 50, 0xff22aa);
        // let s = new Test(this, t);
        // this.add(s);

        // let timer = new Lightning.Timer(this, 250);
        // timer.events.subscribe('tick', () => {
        //     console.log('testy');
        // });

        // setTimeout(() => {
        //     this.game.scenes.start('game');
        //     this.game.scenes.destroy('menu');
        // }, 2000);
            // this.game.scenes.start('game');
            // this.game.scenes.destroy('menu');

    }
}