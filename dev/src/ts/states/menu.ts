export default class MenuState extends Lightning.State {

    create() {
        let button:Lightning.Graphics = Lightning.Geometry.Rect(50, 50);
        button.tint = 0xff22aa;
        this.add(button);

        this.game.keyboard.key('a').subscribeOnce('pressed', () => {
            console.log('I have been pressed mother fucker');
        });

        this.game.keyboard.key('a').subscribeOnce('pressed', () => {
            console.log('here too?');
        });

        button.interactive = true;
        button.on('mousedown', () => {
            this.game.states.start('game');
        });
    }

    update() {

    }
}