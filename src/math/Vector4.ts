/**
 * Created by yaozh on 2017/6/11.
 */
export default class Vector4
{
    public x:number;
    public y:number;
    public z:number;
    public w:number;

    public constructor(x?:number, y?:number, z?:number,w?:number)
    {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
        this.w = w || 1;
    }
}