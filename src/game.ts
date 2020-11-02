import {IbaseVars, IdrawObj, IPlayer, IController, IManager, ICar} from './models/interfaces.js';
import {random} from './utils/functions.js';

function main(): void {
    
    const baseVars: IbaseVars = {
        ctx: document.querySelector('canvas')!.getContext('2d')!,
        get screenW() {return this.ctx.canvas.width;},
        get screenH() {return this.ctx.canvas.height;},
        size: 20,
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
                let y = (17 * baseVars.size) + (baseVars.size * 2 * i);
                baseVars.ctx.moveTo(0, y);
                baseVars.ctx.lineTo(baseVars.screenW, y);
                baseVars.ctx.stroke();
            }

        }
    }

    const car: ICar = {
        color: 'red',
        x: 0,
        y: 0,
        w: baseVars.size,
        h: baseVars.size,
        speed: 0,
        draw: function () {
            baseVars.ctx.fillStyle = this.color;
            baseVars.ctx.beginPath();
            baseVars.ctx.rect(this.x, this.y, baseVars.size, baseVars.size);
            baseVars.ctx.fill();
        },
        move: function() {
            this.x -= this.speed;
        },
        detectBorderCollision: function () {
            if (this.x + this.w <= 0) {
                objectManager.carsGarbage.push(this);
                objectManager.carsPool = objectManager.carsPool.filter(car => car !== this);
            }
        }
    }

    const objectManager: IManager = {
        carsPool : [],
        carsGarbage: [],
        logsPool: [],
        carsY: [310, 350, 390, 430, 470, 510],
        createCar: function(carY) {
            if (this.carsGarbage.length) {
                let usedCar: any = this.carsGarbage.shift();
                usedCar.x = baseVars.screenW;
                this.carsPool.push(usedCar);
            } else {
                let randomSpeed = random(3, 5);
                let randomX = random(baseVars.screenW, baseVars.screenW + 40);
                let newCar = Object.create(car, {y: {value: carY}, speed: {value: randomSpeed, writable: true}, x: {value: randomX, writable: true}});
                this.carsPool.push(newCar);
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

        detectBorderCollision() {
            if (this.x <= 0) this.x = 0;
            if (this.x + this.w >= baseVars.screenW) this.x = baseVars.screenW - this.w;
            if (this.y <= 0) this.y = 0;
            if (this.y + this.h >= baseVars.screenH) this.y = baseVars.screenH - this.h;
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

    function populateCars() {
        for (let i = 0; i < objectManager.carsY.length; i++) {
            let y = objectManager.carsY[i];
            objectManager.createCar(y);
            console.log(objectManager.carsPool);
        }
    }

    populateCars();

    function gameLoop() {
        drawObj.drawBg();
        drawObj.drawLanes();
        froggy.draw();
        froggy.move();
        froggy.detectBorderCollision();  

        if (objectManager.carsPool.length) {
            for (let i = 0; i < objectManager.carsPool.length; i++) {
                let customCar = objectManager.carsPool[i];
                customCar.draw();
                customCar.move();
                customCar.detectBorderCollision();
                if (objectManager.carsGarbage.length) {
                    objectManager.createCar(customCar.y);
                }
            }
        }
        
        // console.log('pool: ', objectManager.carsPool, 'garbage: ', objectManager.carsGarbage);
       
        requestAnimationFrame(gameLoop);
     }

    requestAnimationFrame(gameLoop);
    window.addEventListener('keydown', controller.isMoving);
    window.addEventListener('keyup', controller.isMoving);
}

main();