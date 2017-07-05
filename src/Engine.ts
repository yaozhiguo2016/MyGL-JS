import Scene3D from "./core/Scene3D";
import RenderContext from "./RenderContext";
/**
 * Created by yaozh on 2017/6/6.
 */
export default class Engine
{
    private _scene:Scene3D;
    private _context:WebGLRenderingContext;
    private static _loopExecutor:Object;


    constructor(antialias?:boolean)
    {
        this._context = RenderContext.createConext(antialias);
    }

    public setScene(scene:Scene3D):void
    {
        this._scene = scene;
    }

    public setRenderLoop(looper:Function, context?:any):void
    {
        Engine._loopExecutor = {
            loopFunc:looper,
            context:context
        };
    }

    public start():void
    {
        Engine.render();
        window.setInterval(()=>{
            document.getElementById('stat').innerHTML = 'fps:' + Engine.fps;
        }, 1000);
    }

    private static time:number = 0;
    private static fps:number = 0;

    private static render():void
    {
        if (Engine._loopExecutor){
            Engine._loopExecutor['loopFunc'].call(Engine._loopExecutor['context']);
        }
        let now:number = Date.now();
        let delta:number = now - Engine.time;
        Engine.fps = Math.floor(1000 / delta);
        Engine.time = now;
        requestAnimationFrame(Engine.render);
    }
}