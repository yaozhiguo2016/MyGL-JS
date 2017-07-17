import StandardMaterial from "./StandardMaterial";
import TextureCube from "../textures/TextureCube";
/**
 * Created by yaozh on 2017/7/6.
 */
export default class CubeMapMaterial extends StandardMaterial
{
    protected _textureCube:TextureCube;

    public constructor()
    {
        super();
        this._type = 'CubeMapMaterial';
    }

    public set textureCube(value:TextureCube)
    {
        this._textureCube = value;
    }

    public get textureCude():TextureCube
    {
        return this._textureCube;
    }
}