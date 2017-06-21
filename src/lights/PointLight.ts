import Light from "./Light";
/**
 * Created by yaozh on 2017/6/6.
 */
export default class PointLight extends Light
{
    private _attenuation:number = 0.1;//衰减
    private _intensity:number = 1.0;

}