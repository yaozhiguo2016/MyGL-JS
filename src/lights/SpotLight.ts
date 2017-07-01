import Light from "./Light";
import Vector3 from "../math/Vector3";
/**
 * Created by yaozh on 2017/6/28.
 */
export default class SpotLight extends Light
{
    public constructor(color?:Vector3, intensity?:Vector3)
    {
        super(color, intensity);

        this._type = 'SpotLight';
    }
}