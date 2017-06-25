import Geometry from "./Geometry";
import Vector3 from "../math/Vector3";
/**
 * Created by yaozh on 2017/6/24.
 */
export default class Sphere extends Geometry
{
    private _radius:number;
    private _segmentWidth:number;
    private _segmentHeight:number;

    private longitude:number = Math.PI * 2;//经度
    private latitude:number = Math.PI; //纬度
    private longStart:number = 0;
    private latiStart:number = 0;

    public constructor(radius?:number, segmentWidth?:number, segmentHeight?:number)
    {
        super();
        this._radius = radius || 50;
        this._segmentWidth = Math.max(3, Math.floor(segmentWidth) || 8);
        this._segmentHeight = Math.max(2, Math.floor(segmentHeight) || 6);
        this.createGeometryData();
    }

    private createGeometryData():void
    {
        // generate vertices, normals and uvs
        let SH:number = this._segmentHeight;
        let SW:number = this._segmentWidth;

        let index:number = 0;
        let grid = [];

        let vertex:Vector3 = new Vector3();
        let normal:Vector3 = new Vector3();

        // buffers

        let indices:Array<number> = [];
        let vertices:Array<number> = [];
        let normals:Array<number> = [];
        let colors:Array<number> = [];
        let uvs:Array<number> = [];

        for (let iy = 0; iy <= SH; iy ++ )
        {
            let verticesRow = [];
            let v:number = iy / SH;
            for (let ix = 0; ix <= SW; ix ++ )
            {
                let u:number = ix / SW;

                // vertex
                vertex.x = - this._radius * Math.cos( this.longStart + u * this.longitude ) * Math.sin( this.latiStart + v * this.latitude );
                vertex.y = this._radius * Math.cos( this.latiStart + v * this.latitude );
                vertex.z = this._radius * Math.sin( this.longStart + u * this.longitude ) * Math.sin( this.latiStart + v * this.latitude );

                vertices.push(vertex.x, vertex.y, vertex.z);

                // normal
                normal.set(vertex.x, vertex.y, vertex.z).normalize();
                normals.push(normal.x, normal.y, normal.z);

                //color
                colors.push(1.0, 1.0, 1.0);

                // uv
                uvs.push(u, 1 - v);
                verticesRow.push(index ++);
            }
            grid.push(verticesRow);
        }

        // indices

        for (let iy = 0; iy < SH; iy ++ )
        {
            for (let ix = 0; ix < SW; ix ++ )
            {
                let a = grid[ iy ][ ix + 1 ];
                let b = grid[ iy ][ ix ];
                let c = grid[ iy + 1 ][ ix ];
                let d = grid[ iy + 1 ][ ix + 1 ];

                if ( iy !== 0 || this.latiStart > 0 ) indices.push( a, b, d );
                if ( iy !== SH - 1 || (this.latiStart + this.latitude) < Math.PI ) indices.push( b, c, d );
            }
        }

        this._vertexPositions = new Float32Array(vertices);
        this._vertexNormals = new Float32Array(normals);
        this._vertexColors = new Float32Array(colors);
        this._vertexUVs = new Float32Array(uvs);

        this._indices = new Uint16Array(indices);

        this.createBufferData();
    }
}