/**
 * @author stanley.yzg
 * Date 2019/1/31
 * Desc:
 */
import Shader from "./Shader";
import RenderContext from "../RenderContext";
import ShaderUtil from "../utils/ShaderUtil";

export default class ShaderManager {
  private static _shaders:Object = {};

  public static addShader(key:string, shader:Shader):void
  {
    this._shaders[key] = shader;
  }

  public static getShader(key:string):Shader
  {
    return this._shaders[key];
  }

  public static removeShader(key:string):void
  {
    let shader:Shader = this._shaders[key];
    if (!shader)return;
    ShaderUtil.deleteProgram(RenderContext.context, shader.program);
    delete this._shaders[key];
  }

  /**
   * 创建并缓存Shader对象，以传入的key作为唯一识别符。如果缓存中已经存在key对应的Shader对象，则直接从缓存中返回该对象。
   * @param {string} key
   * @param ShaderCls
   * @param {string} vertSrc
   * @param {string} fragSrc
   * @returns {Shader}
   */
  public static createShader(key: string, ShaderCls:any, vertSrc?: string, fragSrc?: string):Shader {
    let shader:Shader = this.getShader(key);
    if (shader) return shader;
    shader = new ShaderCls(key, vertSrc, fragSrc);
    shader.extractAttributeAndUniforms();
    this.addShader(key, shader);
    return shader;
  }
}