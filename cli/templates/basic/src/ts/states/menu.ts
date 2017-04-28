export default class MenuState extends Lightning.State {

    create() {
        this.game.states.destroy('menu');
        this.game.states.start('game');
    }
}