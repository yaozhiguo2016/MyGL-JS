import TextFileLoader from "./TextFileLoader";
import CEvent from "../base/BaseEvent";
import EventDispatcher from "../base/EventDispatcher";
/**
 * Created by yaozh on 2017/6/1.
 */
export default class ShaderLoader extends EventDispatcher
{
    private vertLoader:TextFileLoader;
    private fragLoader:TextFileLoader;

    public load(vert:string, frag:string):void
    {
        let vertDone:boolean = false;
        let fragDone:boolean = false;

        this.vertLoader = new TextFileLoader();
        this.vertLoader.load(vert);

        this.fragLoader = new TextFileLoader();
        this.fragLoader.load(frag);

        this.vertLoader.addEventListener(TextFileLoader.TEXT_LOADED, (event:CEvent)=>{
            vertDone = true;
            if (vertDone && fragDone)
            {
                this.dispatch(new CEvent('ShaderComplete', {vert:this.vertLoader.text, frag:this.fragLoader.text}));
            }
        }, this);

        this.fragLoader.addEventListener(TextFileLoader.TEXT_LOADED, (event:CEvent)=>{
            fragDone = true;
            if (vertDone && fragDone)
            {
                this.dispatch(new CEvent('ShaderComplete', {vert:this.vertLoader.text, frag:this.fragLoader.text}));
            }
        }, this);
    }
}