import Light from "./Light";
import Vector3 from "../math/Vector3";
/**
 * Created by yaozh on 2017/6/6.
 * 点光源，描述了这样一种特性：拥有位置属性，自发从位置点向四周发射光线，光线会衰减，衰减系数为attenuate，值越大，衰减越快。
 */
export default class PointLight extends Light
{
    private _scope:number;//光源能投射的范围半径
    private _attenuate:number;//光线的衰减系数

    public constructor(scope?:number, attenuate?:number, color?:Vector3, intensity?:Vector3)
    {
        super(color, intensity);
        this._scope = scope || 1000;
        this._attenuate = attenuate || 1;

        this._type = 'PointLight';
    }

}