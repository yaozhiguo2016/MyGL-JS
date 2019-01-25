/**
 * @author stanley.yzg
 * @date 2018.11.10
 * @description 一个ITick的驱动类，支持fps自定义。
 */
import {ITick} from "./ITick";

export default class Driver implements ITick{
    private _tickList:ITick[] = [];
    private _pause:boolean = true;
    private _fps:number = 60;
    private _name:string = '';
    private _frameElapse:number = 1000 / 60;
    //private _lastRenderTime = 0;

    private _now:number = 0; // 即将执行当前帧是的时间
    private _lastTime:number = 0; // 执行上一帧时的时间
    private _accumulatedBumpTime:number = 0; //前后帧真实的时间差和理想的时间差之间的误差，用于积累补偿

    public constructor(name:string = 'defaultDriver', fps:number = 60) {
        this._fps = fps;
        this._frameElapse = 1000 / fps;
        this._name = name;
    }

    public start():void {
        this._pause = false;
        //this._lastRenderTime = Date.now();
    }

    public stop():void {
        this._pause = true;
    }

    public get pause():boolean {
        return this._pause;
    }

    public set name(value:string) {
        this._name = value;
    }

    public get name():string {
        return this._name;
    }

    public addTicker(ticker:ITick):void {
        if (this._tickList.indexOf(ticker) == -1) {
            this._tickList.push(ticker);
        }
    }

    public removeTicker(ticker:ITick):void {
        let index = this._tickList.indexOf(ticker);
        if (index != -1) {
            this._tickList.splice(index, 1);
        }
    }

    public update(time?:number):void {
        if (this._pause) return;
    
        this._now = time;
        let elapsed:number = this._now - this._lastTime;
        let offset = elapsed + this._accumulatedBumpTime - this._frameElapse;
        if (offset >= 0) {
            this._lastTime = this._now;
            this._accumulatedBumpTime = offset;
            for (let tick of this._tickList) {
                tick.update();
            }
        }
    }
}