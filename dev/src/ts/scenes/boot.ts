export default class BootState extends Lightning.Scene {

    init(params) {
        console.log('init boot');
        // this.game.backgroundColor = 0x4d2ac1;
        this.create();
    }

    create() {
        // this.game.scale.scaleAll();
        this.game.scenes.start('preload');
    }
}