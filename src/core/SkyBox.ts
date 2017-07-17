import Mesh from "./Mesh";
import Cube from "../primitives/Cube";
import CubeMapMaterial from "../materials/CubeMapMaterial";
/**
 * Created by yaozh on 2017/7/6.
 */
export default class SkyBox extends Mesh
{
    public constructor(size:number, material:CubeMapMaterial)
    {
        super(new Cube(size, size, size), material);
        this._type = 'SkyBox';
    }
}
