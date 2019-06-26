import Mesh from "./Mesh";
import Cube from "../primitives/Cube";
import CubeMapMaterial from "../materials/CubeMapMaterial";
import RenderContext from "../RenderContext";
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

    public setGLState():void {
        const gl = RenderContext.context;
        gl.depthFunc(gl.LEQUAL);
        gl.enable(gl.CULL_FACE);
        gl.cullFace(gl.FRONT);
    }

    public clearGLState():void {
        const gl = RenderContext.context;
        gl.depthFunc(gl.LESS);
        gl.disable(gl.CULL_FACE);
    }
}
