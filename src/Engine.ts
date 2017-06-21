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
    }

    private static render():void
    {
        if (Engine._loopExecutor){
            Engine._loopExecutor['loopFunc'].call(Engine._loopExecutor['context']);
        }
        requestAnimationFrame(Engine.render);
    }
}