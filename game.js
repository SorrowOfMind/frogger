const cvs = document.getElementById('game');
const ctx = cvs.getContext('2d');

const width = ctx.canvas.width;
const height = ctx.canvas.height;

const SIZE = 20;

const froggy = {

}

const drawBg = () => {
    ctx.fillStyle = "#008511";
    ctx.fillRect(0, 0, width, SIZE*2);
    ctx.fillStyle = "#00A5EC";
    ctx.beginPath();
    ctx.rect(0, SIZE*2, width, SIZE*12);
    ctx.fill();
    ctx.fillStyle = "#008511";
    ctx.beginPath();
    ctx.rect(0, SIZE*14, width, SIZE);
    ctx.fill();
    ctx.fillStyle = "#2C2C2C";
    ctx.beginPath();
    ctx.rect(0, SIZE*15, width, SIZE*12);
    ctx.fill();
    ctx.fillStyle = "#008511";
    ctx.beginPath();
    ctx.rect(0, SIZE*27, width, SIZE*2);
    ctx.fill();
  
}

const drawLanes = () => {
    ctx.strokeStyle = "white";
    ctx.beginPath();
    
    for (let i = 0; i < width; i++) {
        ctx.moveTo(i*SIZE, SIZE*16);
        for (let j = 0; j < 21; j++) {
            ctx.lineTo(j, SIZE*16);
        }
    }
    ctx.stroke();
}

drawBg();
drawLanes();