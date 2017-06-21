/**
 * Created by yaozh on 2017/6/1.
 */
export default class BaseEvent
{
    public type:string;
    public data:any;
    //public target:Object;
    public currentTarget:Object;

    constructor(type:string, data?:any)
    {
        this.type = type;
        this.data = data;
    }
}