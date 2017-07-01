import Mesh from "../../core/Mesh";
import Material from "./../Material";
/**
 * Created by yaozh on 2017/6/27.
 */
export default class MaterialResolver
{
    protected _mesh:Mesh;
    protected _material:Material;

    public constructor(mesh:Mesh, material:Material)
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