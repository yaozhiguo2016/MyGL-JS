import Vector3 from "../math/Vector3";
import PointLight from "./PointLight";

/**
 * Created by yaozh on 2017/6/28.
 */
export default class SpotLight extends PointLight {
  private _direction: Vector3;
  private _theta: number;

  public constructor(direction: Vector3, theta: number, scope?: number, attenuate?: number, color?: Vector3, intensity?: number) {
    super(scope, attenuate, color, intensity);
    this._direction = direction;
    this._theta = theta;
    this._type = 'SpotLight';
  }

  /**
   * 聚光灯的中轴线方向
   * @returns {Vector3}
   */
  public get direction(): Vector3 {
    return this._direction;
  }

  /**
   * 聚光灯范围半径的夹角，弧度表示; 取值应该小于 Math.PI,否则将退化成点光源 ∈[0, Math.PI/2]
   * @returns {number}
   */
  public get theta(): number {
    return this._theta;
  }
}