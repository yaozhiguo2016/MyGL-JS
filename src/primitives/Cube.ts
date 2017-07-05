import Geometry from "./Geometry";
/**
 * Created by yaozh on 2017/6/6.
 */
export default class Cube extends Geometry
{
    private _width:number = 40;
    private _height:number = 40;
    private _depth:number = 40;

    // Create a cube
    //    v6----- v5
    //   /|      /|
    //  v1------v0|
    //  | |     | |
    //  | |v7---|-|v4
    //  |/      |/
    //  v2------v3

    constructor(width:number = 40, height:number = 40, depth:number = 40)
    {
        super();
        this._width = width || 40;
        this._height = height || 40;
        this._depth = depth || 40;

        let hw = this._width * 0.5;
        let hh = this._height * 0.5;
        let hd = this._depth * 0.5;

        this._vertexPositions = new Float32Array([
            hw, hh, hd,  -hw, hh, hd,  -hw,-hh, hd,   hw, -hh, hd,  // v0-v1-v2-v3 front
            hw, hh, hd,   hw, -hh, hd,   hw, -hh, -hd,   hw, hh, -hd,  // v0-v3-v4-v5 right
            hw, hh, hd,   hw, hh, -hd,  -hw, hh, -hd,  -hw, hh, hd,  // v0-v5-v6-v1 up
            -hw, hh, hd,  -hw, hh, -hd,  -hw, -hh, -hd,  -hw, -hh, hd,  // v1-v6-v7-v2 left
            -hw, -hh, -hd,   hw, -hh, -hd,   hw, -hh, hd,  -hw, -hh, hd,  // v7-v4-v3-v2 down
            hw, -hh, -hd,  -hw, -hh, -hd,  -hw, hh, -hd,   hw, hh, -hd   // v4-v7-v6-v5 back
        ]);

        this._vertexColors = new Float32Array([     // Colors
            0.4, 0.4, 1.0,  0.4, 0.4, 1.0,  0.4, 0.4, 1.0,  0.4, 0.4, 1.0,  // v0-v1-v2-v3 front(blue)
            0.4, 1.0, 0.4,  0.4, 1.0, 0.4,  0.4, 1.0, 0.4,  0.4, 1.0, 0.4,  // v0-v3-v4-v5 right(green)
            1.0, 0.4, 0.4,  1.0, 0.4, 0.4,  1.0, 0.4, 0.4,  1.0, 0.4, 0.4,  // v0-v5-v6-v1 up(red)
            1.0, 1.0, 0.4,  1.0, 1.0, 0.4,  1.0, 1.0, 0.4,  1.0, 1.0, 0.4,  // v1-v6-v7-v2 left
            1.0, 1.0, 1.0,  1.0, 1.0, 1.0,  1.0, 1.0, 1.0,  1.0, 1.0, 1.0,  // v7-v4-v3-v2 down
            0.4, 1.0, 1.0,  0.4, 1.0, 1.0,  0.4, 1.0, 1.0,  0.4, 1.0, 1.0   // v4-v7-v6-v5 back
        ]);

        this._vertexNormals = new Float32Array([    // Normal
            0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,  // v0-v1-v2-v3 front
            1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,  // v0-v3-v4-v5 right
            0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,  // v0-v5-v6-v1 up
            -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  // v1-v6-v7-v2 left
            0.0,-1.0, 0.0,   0.0,-1.0, 0.0,   0.0,-1.0, 0.0,   0.0,-1.0, 0.0,  // v7-v4-v3-v2 down
            0.0, 0.0,-1.0,   0.0, 0.0,-1.0,   0.0, 0.0,-1.0,   0.0, 0.0,-1.0   // v4-v7-v6-v5 back
        ]);

        this._vertexUVs = new Float32Array([    // uv
            0.0, 0.0,   0.0, 1.0,   1.0, 0.0,   1.0, 1.0,  // v0-v1-v2-v3 front
            0.0, 0.0,   0.0, 1.0,   1.0, 0.0,   1.0, 1.0,  // v0-v3-v4-v5 right
            0.0, 0.0,   0.0, 1.0,   1.0, 0.0,   1.0, 1.0,  // v0-v5-v6-v1 up
            0.0, 0.0,   0.0, 1.0,   1.0, 0.0,   1.0, 1.0,  // v1-v6-v7-v2 left
            0.0, 0.0,   0.0, 1.0,   1.0, 0.0,   1.0, 1.0,  // v7-v4-v3-v2 down
            0.0, 0.0,   0.0, 1.0,   1.0, 0.0,   1.0, 1.0   // v4-v7-v6-v5 back
        ]);

        this._indices = new Uint16Array([       // Indices of the vertices
            0, 1, 2,   0, 2, 3,    // front
            4, 5, 6,   4, 6, 7,    // right
            8, 9,10,   8,10,11,    // up
            12,13,14,  12,14,15,    // left
            16,17,18,  16,18,19,    // down
            20,21,22,  20,22,23     // back
        ]);
    }
}