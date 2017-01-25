/// <reference path="./../reference.d.ts" />

namespace Game {
    export namespace States {
        export class MenuState extends Game.State {

            constructor(game:Game.Engine) {
                super(game);
            }

            init(params) {
                this.create();
            }

            create() {

                let sContainer = new PIXI.Container();
                this.addChild(sContainer);

                let padding = this.game.width * 0.05;
                let width = this.game.width - padding;
                let height = this.game.height - padding;
                let lineWidth = width / 8;
                let offsetX = lineWidth / 2 + padding / 2;
                let offsetY = lineWidth / 2 + padding / 2;
                let squareWidth = width / 8 * 0.76;

                let maxY = Math.floor(height / lineWidth);
                let heightMax = maxY * lineWidth;
                let diff = height - heightMax;

                for(let y = 0; y < maxY; y ++) {
                    for(let x = 0; x < 8; x++) {
                        let square = new Prefab.BGSquare(this.game, squareWidth, x, 0);
                        square.x = offsetX + (lineWidth * x);
                        square.y = offsetY + (diff * 0.50) + (lineWidth * y);
                        for(let i of Utils.SquarePositions.menuHide) {
                            if(i.x === x && i.y === y) {
                                switch(i.type) {
                                    case 'c':
                                        square.drawCircle();
                                        break;
                                    case 's':
                                        square.drawStar();
                                        break;
                                    case 't':
                                        square.drawTriangle();
                                        break;
                                    case 'd':
                                        square.drawDiamond();
                                        break;
                                    case 'q':
                                        square.drawWhiteSquare();
                                        break;
                                    case 'b':
                                        square.alpha = 0;
                                        break;
                                }
                            }
                        }
                        if(x === 3 && y === 0) {
                            square.drawCircle();
                        }
                        sContainer.addChild(square);
                    }
                }
            }
        }
    }
}