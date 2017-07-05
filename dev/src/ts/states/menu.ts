export default class MenuState extends Lightning.State {

    private particleEmitter;

    create() {
        let button:Lightning.Graphics = Lightning.Geometry.Rect(50, 50);
        button.tint = 0xff22aa;
        this.add(button);

        let sound = this.game.audio.load('meeseeks', ['audio.mp3']);

        this.game.keyboard.key('space').subscribe('pressed', () => {
            sound.play();
        });

        this.game.keyboard.key('a').subscribeOnce('pressed', () => {
            // console.log('I have been pressed mother fucker');
        });

        this.game.keyboard.key('a').subscribeOnce('pressed', () => {
            // console.log('here too?');
        });

        button.interactive = true;
        button.on('pointerdown', () => {
            console.log('yoo')
            this.game.states.start('game');
        });

        this.particleEmitter = new Lightning.ParticleEmitter(this, 0, this.game.center.y);
        this.add(this.particleEmitter);

        // generate a texture for the particle emitter
        let texture:Lightning.Texture = Lightning.Geometry.Rect(8, 8).generateCanvasTexture();

        // add that texture to the particle emitter
        this.particleEmitter.add(texture);

        this.particleEmitter.enableDebug();

        this.particleEmitter.setGravity(0, 0.01);
        this.particleEmitter.setVelocityRange(-0.3, 0.3, -0.3, 0.3);
        this.particleEmitter.setInterval(50);
        this.particleEmitter.addToLocal = false;
        this.particleEmitter.setRotationIncrement(-0.1, 0.1)
        this.particleEmitter.setStrength(2);
        this.particleEmitter.start();
    }

    update() {

    }
}