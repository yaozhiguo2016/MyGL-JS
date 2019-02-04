/**
 * Created by yaozh on 2017/6/6.
 */

import Shader from "../shaders/Shader";

export default class Material {
  protected _type: string;
  protected _shader: Shader;

  public constructor() {
    this._type = 'Material';
  }

  public get shader(): Shader {
    return this._shader;
  }

  public get type(): string {
    return this._type;
  }

  /**
   * 获取当前材质对应的着色器
   * @returns {Shader}
   */
  public getShader(): Shader {
    return null;
  }
}