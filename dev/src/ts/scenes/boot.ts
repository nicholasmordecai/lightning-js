export default class BootState extends Lightning.Scene {

    init(params) {
        this.game.backgroundColor = 0x4d2ac1;
        this.create();
    }

    create() {
        this.game.scenes.start('preload');
    }
}