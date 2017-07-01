import Light from "./Light";
import Vector3 from "../math/Vector3";
/**
 * Created by yaozh on 2017/6/28.
 */
export default class DirectionLight extends Light
{
    public constructor(color?:Vector3, intensity?:Vector3)
    {
        super(color, intensity);
        this.position.y = 1;//默认光源方向竖直向下
        this._type = 'DirectionLight';
    }

    /**
     * 光源的方向
     * @returns {Vector3}
     */
    public get direction():Vector3
    {
        return new Vector3().subVectors(this.position, Vector3.ZERO);
    }
}