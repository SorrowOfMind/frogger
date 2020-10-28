import {IbaseVars, IdrawObj, IPlayer, IController} from './models/interfaces.js';

function main(): void {
    const baseVars: IbaseVars = {
        ctx: document.querySelector('canvas')!.getContext('2d')!,
        get screenW() {return this.ctx.canvas.width;},
        get screenH() {return this.ctx.canvas.height;},
        size: 20
    }

    const drawObj: IdrawObj = {
        drawBg() {
            baseVars.ctx.fillStyle = "#008511";
            baseVars.ctx.fillRect(0, 0, baseVars.screenW, baseVars.size*2);
            baseVars.ctx.fillStyle = "#00A5EC";
            baseVars.ctx.beginPath();
            baseVars.ctx.rect(0, baseVars.size*2, baseVars.screenW, baseVars.size*12);
            baseVars.ctx.fill();
            baseVars.ctx.fillStyle = "#008511";
            baseVars.ctx.beginPath();
            baseVars.ctx.rect(0, baseVars.size*14, baseVars.screenW, baseVars.size);
            baseVars.ctx.fill();
            baseVars.ctx.fillStyle = "#2C2C2C";
            baseVars.ctx.beginPath();
            baseVars.ctx.rect(0, baseVars.size*15, baseVars.screenW, baseVars.size*12);
            baseVars.ctx.fill();
            baseVars.ctx.fillStyle = "#008511";
            baseVars.ctx.beginPath();
            baseVars.ctx.rect(0, baseVars.size*27, baseVars.screenW, baseVars.size*2);
            baseVars.ctx.fill();
        },
        drawLanes() {
            baseVars.ctx.strokeStyle = "#fff";
            baseVars.ctx.beginPath();
            for (let i = 0; i < 5; i++) {
                    // let y = baseVars.size * 16 + i * 22;
                    // baseVars.ctx.moveTo(0, y);
                    // for (let j = 0; j < 30; j++) {
                    //     baseVars.ctx.moveTo(j * baseVars.size, y);
                    //     baseVars.ctx.lineTo(j * baseVars.size + 10, y);
                    //     baseVars.ctx.stroke();
                    // }
                let y = (16 * baseVars.size + baseVars.size) + (baseVars.size * 2 * i);
                baseVars.ctx.moveTo(0, y);
                baseVars.ctx.lineTo(baseVars.screenW, y);
                baseVars.ctx.stroke();
            }

        }
    }

    class Player implements IPlayer {
        readonly color: string = '#2ADE18'
        constructor(private x: number, private y: number, private w: number, private h: number, private velX: number, private velY: number, private speed: number) {}
        draw() {
            baseVars.ctx.fillStyle = this.color;
            baseVars.ctx.beginPath();
            baseVars.ctx.rect(this.x, this.y, this.w, this.h);
            baseVars.ctx.fill();
        }
        move() {
            if (controller.right) {
                console.log('I am moving!');
                this.velX = this.speed;
                this.x += this.velX;
            }
            if (controller.left) {
                this.velX = - this.speed;
                this.x += this.velX;
            }
            if (controller.up) {
                this.velY = - this.speed;
                this.y += this.velY;
            }
            if (controller.down) {
                this.velY = this.speed;
                this.y += this.velY;
            }
        }
    }

    let froggy = new Player(baseVars.screenW * 0.5 - baseVars.size, baseVars.screenH - baseVars.size, baseVars.size, baseVars.size, 0, 0, 2);

    const controller: IController = {
        left: false,
        right: false,
        up: false,
        down: false,

        isMoving (e: KeyboardEvent) {
            let keyStatus = (e.type == 'keydown') ? true : false;
            let key = e.key;
            switch (key) {
                case 'ArrowLeft':
                    controller.left = keyStatus;
                    break;
                case 'ArrowUp':
                    controller.up = keyStatus;
                    break;
                case 'ArrowRight':
                    controller.right = keyStatus;
                    break;
                case 'ArrowDown':
                    controller.down = keyStatus;
                    break;
            }
        }
    }

    function gameLoop() {
        drawObj.drawBg();
        drawObj.drawLanes();
        froggy.draw();
        froggy.move();

        requestAnimationFrame(gameLoop);
     }

    requestAnimationFrame(gameLoop);
    window.addEventListener('keydown', controller.isMoving);
    window.addEventListener('keyup', controller.isMoving);
}

main();