export default class Test extends Lightning.Sprite {

    constructor(scene, texture) {
        super(texture);

        this.enableUpdate(scene.events.event('update'));
    }

    public update() {
        console.log('yo')
    }
}