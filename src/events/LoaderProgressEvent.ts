import BaseEvent from "../base/BaseEvent";
/**
 * Created by yaozh on 2017/6/26.
 */
export default class LoaderProgressEvent extends BaseEvent
{
    public static PROGRESS:string = 'loadProgress';

    public loaded:number;
    public total:number;

    public constructor(type:string, loaded:number, total:number, data?:any)
    {
        super(type, data);
        this.loaded = loaded;
        this.total = total;
    }
}