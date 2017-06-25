import Geometry from "./Geometry";
/**
 * Created by yaozh on 2017/6/25.
 */
export default class Plane extends Geometry
{
    private _width:number;
    private _height:number;

    public constructor(width?:number, height?:number)
    {
        super();
        this._width = width || 10;
        this._height = height || 10;

        let hw:number = this._width * 0.5;
        let hh:number = this._height * 0.5;

        this._vertexPositions = new Float32Array([
            -1.0 * hw, 0, -1.0 * hh,  //left-top
            -1.0 * hw, 0, 1.0 * hh,     //left-bottom
            1.0 * hw, 0, 1.0 * hh,  //right-bottom
            1.0 * hw, 0, -1.0 * hh  //right-top
        ]);

        this._vertexNormals = new Float32Array([
            0, 1.0, 0,
            0, 1.0, 0,
            0, 1.0, 0,
            0, 1.0, 0
        ]);

        this._vertexColors = new Float32Array([
            1.0, 1.0, 1.0,
            1.0, 1.0, 1.0,
            1.0, 1.0, 1.0,
            1.0, 1.0, 1.0
        ]);

        this._vertexUVs = new Float32Array([
            0.0, 0.0,
            0.0, 1.0,
            1.0, 1.0,
            1.0, 0.0
        ]);

        this._indices = new Uint16Array([
            0, 1, 2, 0, 2, 3
        ]);

        this.createBufferData();
    }
}