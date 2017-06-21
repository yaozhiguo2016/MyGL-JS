import Object3D from "../core/Object3D";
import Vector3 from "../math/Vector3";
/**
 * Created by yaozh on 2017/6/6.
 */
export default class Light extends Object3D
{
    private _color:Vector3;

    public get color():Vector3
    {
        return this._color;
    }

    public set color(value:Vector3)
    {
        this._color = value;
    }
}