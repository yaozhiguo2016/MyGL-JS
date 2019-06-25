import Scene3D from "./core/Scene3D";
import RenderContext from "./RenderContext";
import Driver from "./driver/Driver";
import DriverManager from "./driver/DriverManager";

/**
 * Created by yaozh on 2017/6/6.
 */

declare class Stats {
  showPanel(type: number);

  begin();

  end();

  dom: HTMLElement;
}

export default class Engine {
  private _context: WebGLRenderingContext;
  private _loopExecutor: { loopFunc: Function, context: any };
  private stats: Stats;


  constructor(canvas:HTMLCanvasElement, antialias?: boolean) {
    this._context = RenderContext.createConext(canvas, antialias);
    console.log(this._context.getContextAttributes());

  }

  public setRenderLoop(looper: Function, context?: any): void {
    this._loopExecutor = {
      loopFunc: looper,
      context: context
    };
  }

  public start(): void {
    this.stats = new Stats();
    this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(this.stats.dom);

    let renderDriver: Driver = new Driver('renderDriver', 60);
    DriverManager.addDriver(renderDriver.name, renderDriver);
    DriverManager.start();
    renderDriver.addTicker(this);
    renderDriver.start();
  }

  public update(): void {
    this.stats.begin();
    if (this._loopExecutor) {
      this._loopExecutor.loopFunc.call(this._loopExecutor.context);
    }
    this.stats.end();
  }
}