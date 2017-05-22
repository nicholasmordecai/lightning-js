export default class MenuState extends Lightning.State {

    create() {
        this.game.states.destroy('preload');
        this.game.states.start('game');
    }
}