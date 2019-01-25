/**
 * @author stanley.yzg
 * @date 2018.11.10
 * @description 管理Driver的类
 */
import Driver from "./Driver";

export default class DriverManager {
    private static _drivers:Object = {};
    private static _pause:boolean = false;

    public static addDriver(name:string, driver:Driver):void {
        if (!this._drivers[name]) {
            this._drivers[name] = driver;
            driver.name = name;
        } else {
            console.warn('driver with name ' + name + ' has already exist.');
        }
    }

    public static removeDriver(name:string):void {
        if (this._drivers[name]) {
            this._drivers[name].stop();
            delete this._drivers[name];
        } 
    }

    public static getDriver(name:string):Driver {
        return this._drivers[name];
    }

    public static getAll():Driver[] {
        let result = [];
        for (let key in this._drivers) {
            result.push(this._drivers[key]);
        }
        return result;
    }

    public static start():void {
        this._pause = false;
        this.tick();
    }

    public static stop():void {
        this._pause = true;
    }

    private static tick():void {
        if (DriverManager._pause) return;
        DriverManager.step();
        requestAnimationFrame(DriverManager.tick);
    }

    private static step():void {
        for (let key in this._drivers) {
            let driver:Driver = this._drivers[key];
            if (driver.pause) continue;
            driver.update(performance.now());
        }
    }
}