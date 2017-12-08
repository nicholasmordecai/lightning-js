import Test from './../prefabs/test';

export default class MenuState extends Lightning.Scene {

    create() {
        let button = new Lightning.Sprite(Lightning.Geometry.Rect(50, 50, 0xff22aa).generateTexture());
        button.x = this.game.width - 10;
        button.y = this.game.height - 10;
        button.interactive = true;
        button.enableDrag();
        button.on('mousedown', () => {
            console.log('hi')
        })
        this.add(button);

        console.log(button)

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

        // this.particleEmitter = new Lightning.ParticleEmitter(this, 0, this.game.center.y);
        // this.add(this.particleEmitter);

        // // generate a texture for the particle emitter
        // let texture:Lightning.Texture = Lightning.Geometry.Rect(8, 8, 0xff22aa);

        // // add that texture to the particle emitter
        // this.particleEmitter.add(texture);

        // this.particleEmitter.enableDebug();
        // this.particleEmitter.x = this.game.center.x;
        // this.particleEmitter.y = this.game.center.y;

        // this.particleEmitter.preFillPool(300);

        // this.particleEmitter.setGravity(0, 0.01);
        // this.particleEmitter.setVelocityRange(-0.3, 0.3, -0.3, 0.3);
        // this.particleEmitter.setInterval(50);
        // // this.particleEmitter.addToLocal = false;
        // this.particleEmitter.setRotationIncrement(-0.1, 0.1)
        // this.particleEmitter.setStrength(2);

        // this.particleEmitter.start();

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
            this.game.scenes.start('game');
            this.game.scenes.destroy('menu');

    }
}