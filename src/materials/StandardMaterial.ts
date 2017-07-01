import Material from "./Material";
/**
 * Created by yaozh on 2017/6/6.
 */
export default class StandardMaterial extends Material
{
    public constructor()
    {
        super();
        this._type = 'StandardMaterial';
    }
}