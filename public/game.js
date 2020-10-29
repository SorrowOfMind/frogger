function main() {
    const baseVars = {
        ctx: document.querySelector('canvas').getContext('2d'),
        get screenW() { return this.ctx.canvas.width; },
        get screenH() { return this.ctx.canvas.height; },
        size: 20
    };
    const drawObj = {
        drawBg() {
            baseVars.ctx.fillStyle = "#008511";
            baseVars.ctx.fillRect(0, 0, baseVars.screenW, baseVars.size * 2);
            baseVars.ctx.fillStyle = "#00A5EC";
            baseVars.ctx.beginPath();
            baseVars.ctx.rect(0, baseVars.size * 2, baseVars.screenW, baseVars.size * 12);
            baseVars.ctx.fill();
            baseVars.ctx.fillStyle = "#008511";
            baseVars.ctx.beginPath();
            baseVars.ctx.rect(0, baseVars.size * 14, baseVars.screenW, baseVars.size);
            baseVars.ctx.fill();
            baseVars.ctx.fillStyle = "#2C2C2C";
            baseVars.ctx.beginPath();
            baseVars.ctx.rect(0, baseVars.size * 15, baseVars.screenW, baseVars.size * 12);
            baseVars.ctx.fill();
            baseVars.ctx.fillStyle = "#008511";
            baseVars.ctx.beginPath();
            baseVars.ctx.rect(0, baseVars.size * 27, baseVars.screenW, baseVars.size * 2);
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
                let y = (17 * baseVars.size) + (baseVars.size * 2 * i);
                baseVars.ctx.moveTo(0, y);
                baseVars.ctx.lineTo(baseVars.screenW, y);
                baseVars.ctx.stroke();
            }
        }
    };
    const car = {
        color: 'blue',
        x: baseVars.screenW,
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
        move: function () {
            this.x -= this.speed;
        },
        detectBorderCollision: function () {
            if (this.x + this.w <= 0) {
                objectManager.carsGarbage.push(this);
                objectManager.carsPool = objectManager.carsPool.filter(car => car.x !== this.x && car.y !== this.y);
            }
        }
    };
    const objectManager = {
        carsPool: [],
        carsGarbage: [],
        logsPool: [],
        carsY: [380, 420],
        createCar: function () {
            if (this.carsGarbage.length) {
                let usedCar = this.carsGarbage.shift();
                usedCar.x = baseVars.screenW;
                this.carsPool.push(usedCar);
            }
            else {
                let newCar = Object.create(car, { y: { value: this.carsY[0] }, speed: { value: 1 } });
                this.carsPool.push(newCar);
            }
        }
    };
    class Player {
        constructor(x, y, w, h, velX, velY, speed) {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.velX = velX;
            this.velY = velY;
            this.speed = speed;
            this.color = '#2ADE18';
        }
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
                this.velX = -this.speed;
                this.x += this.velX;
            }
            if (controller.up) {
                this.velY = -this.speed;
                this.y += this.velY;
            }
            if (controller.down) {
                this.velY = this.speed;
                this.y += this.velY;
            }
        }
        detectBorderCollision() {
            if (this.x <= 0)
                this.x = 0;
            if (this.x + this.w >= baseVars.screenW)
                this.x = baseVars.screenW - this.w;
            if (this.y <= 0)
                this.y = 0;
            if (this.y + this.h >= baseVars.screenH)
                this.y = baseVars.screenH - this.h;
        }
    }
    let froggy = new Player(baseVars.screenW * 0.5 - baseVars.size, baseVars.screenH - baseVars.size, baseVars.size, baseVars.size, 0, 0, 2);
    const controller = {
        left: false,
        right: false,
        up: false,
        down: false,
        isMoving(e) {
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
    };
    objectManager.createCar();
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
