/**
 * Created by yaozh on 2017/6/11.
 */
export default class Vector4
{
    public x:number;
    public y:number;
    public z:number;
    public w:number;

    private _elements:Float32Array;

    public get elements():Float32Array
    {
        return new Float32Array([
            this.x,
            this.y,
            this.z,
            this.w
        ]);
    }

    public constructor(x?:number, y?:number, z?:number, w?:number)
    {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
        if (w == void 0)this.w = 1;
        else if (w == 0.0)this.w = 0.0;
        else this.w = w;
        this._elements = new Float32Array([
            this.x,
            this.y,
            this.z,
            this.w
        ]);
    }

    public set ( x:number, y:number, z:number, w:number ):Vector4
    {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
        return this;
    }
}