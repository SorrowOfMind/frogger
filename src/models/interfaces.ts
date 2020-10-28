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