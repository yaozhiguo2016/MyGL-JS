import Mesh from "../../core/Mesh";
import StandardMaterial from "../StandardMaterial";
/**
 * Created by yaozh on 2017/6/27.
 */
export default class MaterialResolver
{
    protected _mesh:Mesh;
    protected _material:StandardMaterial;

    public constructor(mesh:Mesh, material:StandardMaterial)
    {
        this._mesh = mesh;
        this._material = material;
    }

    public initMeshData():void
    {

    }

    public resetAttribsAndUniforms():void
    {

    }
}