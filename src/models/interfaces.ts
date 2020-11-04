export interface IbaseVars {
    ctx: CanvasRenderingContext2D;
    screenW: number;
    screenH: number;
    size: number;
    gameOver: boolean;
}

export interface IdrawObj {
    drawBg(): void;
    drawLanes(): void;
}

export interface IPlayer {
    draw(): void;
    move(): void;
    detectBorderCollision(): void;
    detectCarCollision(x: number, y: number, w:number, h: number): void;
}

export interface IController {
    left: boolean;
    right: boolean;
    up: boolean;
    down: boolean;
    isMoving(e: KeyboardEvent):void;
}

export interface ICar {
    color: string; 
    x: number;
    y: number;
    w: number;
    h: number;
    speed: number;
    draw(): void;
    move(): void;
    detectBorderCollision(): void;
}

export interface IManager {
    carsPool: ICar[];
    carsGarbage: ICar[];
    logsPool: any[];
    carsY: number[];
    createCar(y: number): void;
}