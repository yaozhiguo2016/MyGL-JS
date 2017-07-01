import Object3D from "../core/Object3D";
import Vector3 from "../math/Vector3";
/**
 * Created by yaozh on 2017/6/6.
 */
export default class Light extends Object3D
{
    /**
     * 光源的颜色
     */
    protected _color:Vector3;
    /**
     * 光的强度，在0-1之间
     */
    protected _intensity:Vector3; //range 0-1
    /**
     * 标识本光源是否可用
     */
    protected _enabled:boolean;

    public get color():Vector3
    {
        return this._color;
    }

    public set color(value:Vector3)
    {
        this._color = value;
    }

    public get intensity():Vector3
    {
        return this._intensity;
    }

    public set intensity(value:Vector3)
    {
        this._intensity = value;
    }

    public get enabled():boolean
    {
        return this._enabled;
    }

    public set enabled(value:boolean)
    {
        this._enabled = value;
    }

    public constructor(color?:Vector3, intensity?:Vector3)
    {
        super();
        this._color = color || new Vector3(1.0,1.0,1.0);
        this._intensity = intensity || new Vector3(1, 1, 1);
        this._enabled = true;

        this._type = 'Light';
    }
}