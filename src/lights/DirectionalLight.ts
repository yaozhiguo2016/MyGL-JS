import Light from "./Light";
import Vector3 from "../math/Vector3";

/**
 * Created by yaozh on 2017/6/28.
 */
export default class DirectionalLight extends Light {
  public constructor(color?: Vector3, intensity?: number) {
    super(color, intensity);
    this.position.y = 1;//默认光源方向竖直向下
    this._type = 'DirectionalLight';
  }
}