export default class MenuState extends Lightning.State {

    create() {
        console.log(this.game.world.children);
        let button:Lightning.Graphics = Lightning.Geometry.Rect(50, 50);
        button.tint = 0xff22aa;
        this.add(button);

        button.interactive = true;
        button.on('mousedown', () => {
            this.game.states.start('game');
        });
    }

    update() {

    }
}