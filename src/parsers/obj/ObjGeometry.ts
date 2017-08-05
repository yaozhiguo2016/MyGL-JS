import Geometry from "../../primitives/Geometry";
import ObjParser from "./ObjParser";
/**
 * Created by yaozh on 2017/8/4.
 */
export default class ObjGeometry extends Geometry
{
    public constructor(parser:ObjParser)
    {
        super();
        this._indexDraw = false;

        this._vertexPositions = new Float32Array(parser.vertices);
        this._vertexNormals = new Float32Array(parser.normals);
        this._vertexUVs = new Float32Array(parser.textures);
        this.vertexCount = parser.vertexCount;
    }
}