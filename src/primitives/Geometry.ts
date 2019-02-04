/**
 * 几何体基础类，基本信息包括顶点位置，顶点法线，顶点颜色，顶点UV坐标，顶点索引值等。
 * Created by yaozh on 2017/6/6.
 */
export default class Geometry
{
    protected _vertexPositions:Float32Array;
    protected _vertexNormals:Float32Array;
    protected _vertexColors:Float32Array;
    protected _indices:Uint16Array;
    protected _vertexUVs:Float32Array;

    // 这些事默认值，子类可以根据数据定义覆盖这些值
    protected _vertexPosNum:number;
    protected _vertexNormalNum:number;
    protected _vertexColorNum:number;
    protected _vertexUVNum:number;
    
    // 是否根据索引绘制
    protected _indexDraw:boolean;
    /**
     * 子类需负责提供正确的顶点数
     */
    protected _vertexNum:number;

    constructor() {
        this._indexDraw = true;
        this._vertexNum = 0;
        this._vertexPosNum = 3;
        this._vertexNormalNum = 3;
        this._vertexColorNum = 3;
        this._vertexUVNum = 2;
    }

    public get indexDraw():boolean
    {
        return this._indexDraw;
    }

    /**
     * 当前几何体的顶点数
     */
    public get vertexNum():number {
        return this._vertexNum;
    }

    public get vertexPositions():Float32Array{
        return this._vertexPositions;
    }

    public get vertexNormals():Float32Array{
        return this._vertexNormals;
    }

    public get vertexColors():Float32Array{
        return this._vertexColors;
    }

    public get uvs():Float32Array{
        return this._vertexUVs;
    }

    public get indices():Uint16Array{
        return this._indices;
    }

    public get vertexPosNum():number {
        return this._vertexPosNum;
    }

    public get vertexNormalNum():number {
        return this._vertexNormalNum;
    }

    public get vertexColorNum():number {
        return this._vertexColorNum;
    }

    public get vertexUVNum():number {
        return this._vertexUVNum;
    }
}