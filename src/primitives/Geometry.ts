/**
 * Created by yaozh on 2017/6/6.
 */
export default class Geometry
{
    protected _vertexPositions:Float32Array;
    protected _vertexNormals:Float32Array;
    protected _vertexColors:Float32Array;
    protected _indices:Uint16Array;
    protected _vertexUVs:Float32Array;

    protected _indexDraw:boolean = true;

    public get indexDraw():boolean
    {
        return this._indexDraw;
    }

    public vertexCount:number = 0;

    public get vertexPositions():Float32Array
    {
        return this._vertexPositions;
    }

    public get vertexNormals():Float32Array
    {
        return this._vertexNormals;
    }

    public get vertexColors():Float32Array
    {
        return this._vertexColors;
    }

    public get uvs():Float32Array
    {
        return this._vertexUVs;
    }

    public get indices():Uint16Array
    {
        return this._indices;
    }

    public vertexPosNum:number = 3;
    public vertexNormalNum:number = 3;
    public vertexColorNum:number = 3;
    public vertexUVNum:number = 2;
}