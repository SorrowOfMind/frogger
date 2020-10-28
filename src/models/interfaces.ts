export interface IbaseVars {
    ctx: CanvasRenderingContext2D;
    screenW: number;
    screenH: number;
    size: number;
}

export interface IdrawObj {
    drawBg(): void;
    drawLanes(): void;
}

export interface IPlayer {
    draw(): void;
    move(): void;
}

export interface IController {
    left: boolean;
    right: boolean;
    up: boolean;
    down: boolean;
    isMoving(e: Event):void;
}