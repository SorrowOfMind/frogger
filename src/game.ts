import {IbaseVars, IdrawObj} from './models/interfaces.js';

function main():void {

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


    function gameLoop() {
        drawObj.drawBg();
        drawObj.drawLanes();

        requestAnimationFrame(gameLoop);
    }

    requestAnimationFrame(gameLoop);
}

main();