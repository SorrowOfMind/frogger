const cvs = document.getElementById('game');
const ctx = cvs.getContext('2d');

const width = ctx.canvas.width;
const height = ctx.canvas.height;

const SIZE = 20;

// const froggy = {
//     width: SIZE,
//     height: SIZE,
//     x: width*0.5 - SIZE,
//     y: height - SIZE,
//     velX: 0,
//     velY: 0,
//     speed: 10,

//     draw() {
//         ctx.fillStyle = '#2ADE18';
//         ctx.beginPath();
//         ctx.rect(this.x, this.y, this.width, this.height);
//         ctx.fill();
//     },

//     move() {
//         if (controller.right) {
//             this.velX = this.speed;
//             this.x += this.velX;
//         }
//         if (controller.left) {
//             this.velX = - this.speed;
//             this.x += this.velX;
//         }
//         if (controller.up) {
//             this.velY = - this.speed;
//             this.y += this.velY;
//         }
//     },

//     detectBorderCollision() {
//         if (this.x <= 0) this.x = 0;
//         if (this.x + this.width >= width) this.x = width - this.width;
//         if (this.y <= 0) this.y = 0;
//     }
// }

// const controller = {
//     left: false,
//     right: false,
//     up: false,
//     down: false,

//     isMoving (e) {
//         let keyStatus = (e.type == 'keydown') ? true : false;
//         let key = e.keyCode;
//         switch (key) {
//             case 37:
//                 controller.left = keyStatus;
//                 break;
//             case 38:
//                 controller.up = keyStatus;
//                 break;
//             case 39:
//                 controller.right = keyStatus;
//                 break;
//         }
//     }
// }

// const drawBg = () => {
//     ctx.fillStyle = "#008511";
//     ctx.fillRect(0, 0, width, SIZE*2);
//     ctx.fillStyle = "#00A5EC";
//     ctx.beginPath();
//     ctx.rect(0, SIZE*2, width, SIZE*12);
//     ctx.fill();
//     ctx.fillStyle = "#008511";
//     ctx.beginPath();
//     ctx.rect(0, SIZE*14, width, SIZE);
//     ctx.fill();
//     ctx.fillStyle = "#2C2C2C";
//     ctx.beginPath();
//     ctx.rect(0, SIZE*15, width, SIZE*12);
//     ctx.fill();
//     ctx.fillStyle = "#008511";
//     ctx.beginPath();
//     ctx.rect(0, SIZE*27, width, SIZE*2);
//     ctx.fill();
  
// }

// const drawLanes = () => {
//     ctx.strokeStyle = "white";
//     ctx.beginPath();
//     for (let i = 0; i < 10; i++) {
//         let y = SIZE*16+i*22;
//         ctx.moveTo(0, y);
//         for (let j = 0; j < 30; j++) {
//             ctx.moveTo(j*SIZE, y);
//             ctx.lineTo(j*SIZE+10, y);
//             ctx.stroke();
//         }
//     }
//     ctx.stroke();
// }

// function gameLoop() {
//     drawBg();
//     drawLanes();
//     froggy.draw();
//     froggy.move();
//     froggy.detectBorderCollision();

//     requestAnimationFrame(gameLoop);
// }

// requestAnimationFrame(gameLoop);
// window.addEventListener('keydown', controller.isMoving);
// window.addEventListener('keyup', controller.isMoving);