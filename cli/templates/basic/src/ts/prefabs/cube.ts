export default class Cube extends Lightning.Sprite {

    private game;

    constructor(game) {
        super(null);
        this.game = game;
        let shape = Lightning.Geometry.Rect3D(100, 50, 25);
        this.texture = this.game.renderer.generateTexture(shape);
        this.tint = 0xA134F6;
    }
}