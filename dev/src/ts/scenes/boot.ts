export default class BootState extends Lightning.Scene {

    init(params) {
        this.game.backgroundColor = 0x092140;
        this.game.scenes.start('preload');
    }
}