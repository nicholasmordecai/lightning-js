export default class BootState extends Lightning.State {

    init(params) {
        this.game.backgroundColor = 0x4d2ac1;
        this.create();
    }

    create() {
        this.game.states.destroy('boot');
        this.game.states.start('preload');
    }
}