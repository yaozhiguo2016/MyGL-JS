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
        Engine.stats = new Stats();
        Engine.stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
        document.body.appendChild( Engine.stats.dom );
        Engine.render();
    }

    private static stats:Stats;

    private static render():void
    {
        Engine.stats.begin();
        if (Engine._loopExecutor){
            Engine._loopExecutor['loopFunc'].call(Engine._loopExecutor['context']);
        }
        Engine.stats.end();
        requestAnimationFrame(Engine.render);
    }
}