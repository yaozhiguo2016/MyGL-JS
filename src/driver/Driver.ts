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
    private _lastRenderTime = 0;

    public constructor(name:string = 'defaultDriver', fps:number = 60) {
        this._fps = fps;
        this._frameElapse = 1000 / fps;
        this._name = name;
    }

    public start():void {
        this._pause = false;
        this._lastRenderTime = Date.now();
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

    public update():void {
        if (this._pause) return;
        for (let tick of this._tickList) {
            tick.update();
        }

        /*let now = Date.now();
        let elapse:number = now - this._lastRenderTime;
        //console.log('ooooooooooooo', elapse);
        if (elapse < this._frameElapse) {
            return;
        }
        this._lastRenderTime = now;
        let elapseCount = Math.floor(elapse / this._frameElapse);
        for (let i:number = 0; i < elapseCount; i++) {
            for (let tick of this._tickList) {
                tick.update();
            }
        }*/
    }
}